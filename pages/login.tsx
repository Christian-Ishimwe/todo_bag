"use client";

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { FaGoogle, FaGithub } from 'react-icons/fa';
const inter = Inter({ subsets: ['latin'] });
export default function IndexPage() {
  const { data, status } = useSession();
  const router = useRouter();
  const [signingInProvider, setSigningInProvider] = useState(null);
  if (status === 'loading') {
    return (
      <div className={`container ${inter.className} min-h-screen flex items-center justify-center bg-gray-900 text-white`}>
        <h1 className="text-xl">Loading... please wait</h1>
      </div>
    );
  }

  if (status === 'authenticated') {
    router.push('/');
    return null; 
  }

  const handleSignIn = async (provider:any) => {
    setSigningInProvider(provider);
    await signIn(provider);
    setSigningInProvider(null); 
  };

  return (
    <div className={`container ${inter.className} min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white`}>
      <h1 className="text-2xl mb-4">Sign In</h1>
      <button
        onClick={() => handleSignIn('google')}
        className="bg-blue-600 text-white px-4 py-2 w-52   rounded-md flex items-center hover:bg-blue-700 transition mb-2"
        disabled={signingInProvider === 'google'}
      >
        <FaGoogle className="mr-2 text-lg" />
        {signingInProvider === 'google' ? 'Signing in...' : 'Sign in with Google'}
      </button>
      <button
        onClick={() => handleSignIn('github')}
        className="bg-gray-800 w-52 text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-700 transition"
        disabled={signingInProvider === 'github'} 
      >
        <FaGithub className="mr-2 text-lg" />
        {signingInProvider === 'github' ? 'Signing in...' : 'Sign in with GitHub'}
      </button>
    </div>
  );
}
