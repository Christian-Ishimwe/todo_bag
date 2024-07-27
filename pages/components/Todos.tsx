import React from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { deleteTodo } from "@/api/todoactions";
interface Task {
  id: string;
  done: boolean;
  task: string;
}

interface TodosProps {
  tasks: Task[];
}

const Todos: React.FC<TodosProps> = ({ tasks }) => {
    const handleDelete=async (id:string)=>{
       if(window.confirm("Are you sure you need to delete this Task?")){
            try{
                await deleteTodo(id)
                toast.success("Task deleted Successful")
            }catch(err:any){
                toast.error(err.message)
            }
       }
    }
  return (
    <ul className="mt-4">
      {tasks.map((task) => (
        <li key={task.id} className="p-2 border-b border-gray-700">
          <input
            type="checkbox"
            checked={task.done}
            className="mr-2"
          />
          {task.task}
        <button type="button" className="
            bg-red-700 text-white px-4 py-1 rounded-md ml-3
        "
        onClick={()=>handleDelete(task.id)}
        >
            Delete
        </button>

</li>
      ))}
    </ul>
  );
};

export default Todos;
