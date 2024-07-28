"use client";

import { Inter } from 'next/font/google';
import AddForm from './components/Form';
import Todos from './components/Todos';
import { useState, useEffect, useCallback } from 'react';
import { getTodo } from '@/api/todoactions';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const inter = Inter({ subsets: ['latin'] });

interface Task {
  id: string;
  done: boolean;
  task: string;
}

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Define fetchTasks outside of useEffect
  const fetchTasks = useCallback(async () => {
    if (status === "authenticated") {
      try {
        const response = await getTodo();
        setTasks(response);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    }
  }, [status]);

  useEffect(() => {
    if (status === "loading") {
      // Show a loading state while the authentication status is being determined
      return;
    }

    if (status === "authenticated") {
      // Fetch tasks after redirection
      fetchTasks();
    } else {
      // Redirect unauthenticated users to the login page
      router.push("/login");
    }
  }, [status, router, fetchTasks]);

  // Render a loading state while the authentication status is being determined
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <main className={`relative container py-4 px-4 min-h-full bg-slate-400 sm:px-6 md:px-8 lg:px-10 ${inter.className}`}>
        <button
          onClick={() => signOut()}
          className='absolute top-4 right-4 bg-slate-900 text-white rounded-md px-4 py-2 hover:bg-slate-800'
        >
          Sign Out
        </button>
        <div className="text-white w-full max-w-2xl mx-auto bg-slate-900 rounded-md p-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {data.user?.name?.split(" ")[1]}'s To Do
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Welcome, {data.user?.name}!</span>
          </div>
          <AddForm onTaskAdded={fetchTasks} />
          <Todos tasks={tasks} onTaskUpdated={fetchTasks} />
        </div>
      </main>
    );
  }
  return null;
}
