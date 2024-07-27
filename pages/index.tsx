import { Inter } from 'next/font/google';
import AddForm from './components/Form';
import Todos from './components/Todos';
import { useState, useEffect } from 'react';
import { getTodo } from '@/api/todoactions';

const inter = Inter({ subsets: ['latin'] });

interface Task {
  id: string;
  done: boolean;
  task: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await getTodo();
      setTasks(response);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className={`container py-4 px-4 sm:px-6 md:px-8 lg:px-10 ${inter.className}`}>
      <div className="text-white w-full max-w-lg mx-auto bg-slate-900 rounded-md p-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Christian To Do</h2>
        <AddForm onTaskAdded={fetchTasks} />
        <Todos tasks={tasks} onTaskUpdated={fetchTasks} />
      </div>
    </main>
  );
}
