"use client";
import Head from 'next/head';
import { Inter } from 'next/font/google';
import AddForm from './components/Form';
import Todos from './components/Todos';
import { useState, useEffect, useCallback } from 'react';
import { getTodo } from './api/todoactions';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners';
import { Button } from '@radix-ui/themes';

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
  const [loading, setLoading]=useState(false)
  const fetchTasks = useCallback(async () => {
    if (status === "authenticated" && data?.user?.email) {
      try {
        const response = await getTodo(data.user.email);
        setTasks(response);
      } catch (error) {
      }
    }
  }, [status, data?.user?.email]);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "authenticated") {
      fetchTasks();
    } else {
      router.push("/login");
    }
  }, [status, router, fetchTasks]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <main className={`relative container py-4 px-4 bg-slate-400 min-h-screen sm:px-6 md:px-8 lg:px-10 ${inter.className}`}>
        <div className='absolute top-4 right-4'>
        <Head>
          <title>{data.user?.name?.split(" ")[1]} Todo</title>
        </Head>
        <Button
          onClick={() => {
            setLoading(true)
            signOut()}}
          className=' bg-slate-900 text-white rounded-md px-3 text-sm py-1 hover:bg-slate-800'
          loading={loading}
            color='tomato'
          >
          Sign Out
        </Button>
         </div>
        <div className="text-white w-full max-w-2xl mx-auto bg-slate-900 rounded-md p-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {data.user?.name?.split(" ")[1]}&apos;s To Do
          </h2>
          <p className="text-lg text-center mb-4">Welcome, {data.user?.name}!</p>
          <AddForm onTaskAdded={fetchTasks} />
          <Todos tasks={tasks} onTaskUpdated={fetchTasks} />
        </div>
      </main>
    );
  }

  return null;
}
