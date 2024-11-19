import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./dbConfig";
import { User } from "./model/userModel";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,}),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      /**
       * This function is called whenever a user tries to sign in with credentials.
       * It will throw an error if the credentials are invalid, otherwise it will return the user object.
       * @param {object} credentials - The credentials entered by the user.
       * @param {string} credentials.email - The user's email address.
       * @param {string} credentials.password - The user's password.
       * @returns {Promise<object>} - The user object if the credentials are valid.
       * @throws {CredentialsSignin} - If the credentials are invalid.
       */
      authorize: async (credentials) => {
        await connectDB();

        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "Missing credentials",
            message: "Missing credentials",});
        }

        // Find user in database
        const user = await User.findOne({ email });
        if (!user) {
          throw new CredentialsSignin({
            cause: "User not found",
            message: "User not found",});
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new CredentialsSignin({
            cause: "Invalid password",
            message: "Invalid password",});
        }

        // Return user object
        return {
          id: user._id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {

    /**
     * After a user signs in, this function is called with the user data and the account data.
     * It should return true if the user is allowed to sign in, and false otherwise.
     * If an error occurs, it should throw an AuthError.
     * @param {object} session - The user data.
     * @param {object} token - The token data.
     * @returns {Promise<boolean>} - True if the user is allowed to sign in, false otherwise.
     * @throws {AuthError} - If an error occurs.
     */
    signIn: async ({ user, account }) => {
      try {
        if (account?.provider === "google") {
          const { email, name, image, id } = user;
          await connectDB();
          const userExists = await User.findOne({ email });
          if (userExists) {
            return true;
          } else {
            await User.create({ googleId: id, email, name, image });
            return true;
          }
        }
        if (account?.provider === "credentials") {
          return true;
        }
        return false;
      } catch (error) {
        throw new AuthError("Error during sign in", error as Error);
      }
    }
  }
  
});
