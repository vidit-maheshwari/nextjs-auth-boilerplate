import { auth, signIn } from '@/auth'
import LoginForm from '@/components/client/LoginForm'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

  

/**
 * Page component that renders a login form and a button to login with Google.
 *
 * If the user is already logged in, this component will redirect to the homepage.
 *
 * @returns The login page component.
 */
const Page = async () => {
  const session = await auth()
  if(session?.user) return redirect('/')
  return (
<>
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <Card className="p-8 w-full max-w-md shadow-lg rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800">
          🔐 Login
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mt-2">
          Welcome to Next Auth Boilerplate{" "}
          <span className="text-blue-600">🌟</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <p className="text-center mb-4 text-gray-500">Or</p>
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
            Login with Google 🌐
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up ✍️
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
</>

  )
}

export default Page
