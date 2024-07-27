import { Inter } from "next/font/google";
import AddForm from "./components/Form";
import Todos from "./components/Todos";
import { useState, useEffect } from "react";
import { getTodo } from "@/api/todoactions";
const inter = Inter({ subsets: ["latin"] });
interface Task{
  id: string,
  done: boolean,
  task: string
}
export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
      async function fetchTasks() {
        try {
          const response = await getTodo();
          setTasks(response);
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
    }
    fetchTasks()
  }, [])
     return (
    <main className="container py-4">
        <div className=" text-white w-1/2 p-2 mx-auto bg-slate-900 rounded-md">
          <h2 className="text-xl text-center">Christian To Do</h2>
          <AddForm/>
          <Todos tasks={tasks}/>
        </div>
    </main>
  );
}
