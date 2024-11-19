import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import connectDB from "@/dbConfig";
import { User } from "../../model/userModel";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

/**
 * Page component for the sign up page.
 *
 * @remarks
 * This page allows a user to sign up using their name, email, and password.
 * It also allows a user to sign up using Google OAuth.
 *
 * @returns The component for the sign up page.
 */
const Page = () => {

  const handleSignUp = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }
    connectDB();
    const user = await User.findOne({ email });
    if (user) {
      throw new CredentialsSignin({
        cause: "User already exists",
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    redirect("/login");
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card className="p-8 w-full max-w-md shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Sign Up
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Made with ❤ by {' '}
              <Link href="https://github.com/vidit-maheshwari" className="underline text-blue-700">Vidit Maheshwari</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
          <p className="text-center my-4 text-gray-500">Or</p>
          <CardContent>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold"
              >
                Sign Up with Google
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Page;
