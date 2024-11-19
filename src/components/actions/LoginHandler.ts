'use server';
import { signIn } from "../../auth";
import { CredentialsSignin } from "next-auth";

/**
 * Handles signing in with credentials (email and password)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string | undefined>} The cause of the error if there is one, otherwise undefined
 */
const  credentialsloginHandler = async (email: string, password: string) => {
      try {
        await signIn("credentials", {
           email,
          password,
    
        });
      } catch (error) {
        const err = error as CredentialsSignin;
        return err.cause
      }
    }



    export  {credentialsloginHandler}