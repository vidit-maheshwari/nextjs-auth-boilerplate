// 'use client';

// import React from 'react';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { credentialsloginHandler} from '../actions/LoginHandler';
// import { toast } from '@/hooks/use-toast';
// import {useRouter} from 'next/navigation';

// function LoginForm() {
//     const router = useRouter();
//   const handler = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission
//     const formData = new FormData(e.currentTarget);
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     if (!email || !password) {
//       toast({
//         title: 'Error',
//         description: 'All fields are required',
//         variant: 'destructive',
//       });
//       return;
//     }

//     const error = await credentialsloginHandler(email, password);
//     if (error) {
//       toast({
//         title: 'Login Failed',
//         description: error,
//         variant: 'destructive',
//       });
//     } else {
//       toast({
//         title: 'Success',
//         description: 'Login successful',
//         variant: 'default',
//       });
    
//       router.refresh();
//     }
//   };

//   return (
//     <form onSubmit={handler}>
//       <div className="flex flex-col gap-2">
//         <p>Email</p>
//         <Input type="email" placeholder="Email" name="email" />
//         <p>Password</p>
//         <Input type="password" placeholder="Password" name="password" />
//       </div>
//       <Button type="submit" className="w-full mt-3">
//         Submit
//       </Button>
//     </form>
//   );
// }

// export default LoginForm;


'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { credentialsloginHandler } from '../actions/LoginHandler';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

/**
 * LoginForm is a form component for logging in to the application.
 *
 * @remarks
 * Handles logging in with credentials (email and password).
 * If there is an error, it displays a toast with the error message.
 * If the login is successful, it displays a toast with a success message
 * and redirects to the home page.
 *
 * @returns A form component with email and password inputs and a submit button.
 */
function LoginForm() {
  const router = useRouter();

  const handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      toast({
        title: '⚠️ Error',
        description: 'All fields are required.',
        variant: 'destructive',
      });
      return;
    }

    const error = await credentialsloginHandler(email, password);
    if (error) {
      toast({
        title: '❌ Login Failed',
        description : error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: '✅ Success',
        description: 'Login successful!',
        variant: 'default',
      });

      router.refresh();
    }
  };

  return (
    <form onSubmit={handler} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4"
      >
        Submit 🚀
      </Button>
    </form>
  );
}

export default LoginForm;
