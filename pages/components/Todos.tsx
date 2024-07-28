// components/Todos.tsx
import React from 'react';
import { toast } from 'react-toastify';
import { changeStatus, deleteTodo, editTodo } from '@/api/todoactions';

interface Task {
  id: string;
  done: boolean;
  task: string;
}

interface TodosProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const Todos: React.FC<TodosProps> = ({ tasks = [], onTaskUpdated }) => {
  const handleEdit = async (id: string) => {
    try {
      const task = window.prompt('Enter the edited task');
      if (task) {
        await editTodo(id, task);
        toast.success('Task updated successfully');
        onTaskUpdated();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(id);
        toast.success('Task deleted successfully');
        onTaskUpdated();
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const handleStatusChange = async (id: string, done: boolean) => {
    try {
      await changeStatus(id, done);
      toast.success('Task status updated successfully');
      onTaskUpdated();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks available. Add a task to get started!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 border-b border-gray-700 flex flex-col md:flex-row md:items-center md:space-x-4 bg-gray-800 rounded-md">
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  checked={task.done}
                  className="mr-2 flex-shrink-0"
                  onChange={() => handleStatusChange(task.id, task.done)}
                />
                <div className="flex-1 overflow-hidden">
                 
                    
                  <input
                    type="text"
                    value={task.task}
                    readOnly
                    className=" bg-inherit text-white border-none w-full truncate outline-0 overflow-auto"
                  />
                </div>
              </div>
              <div className="mt-2 md:mt-0 flex space-x-2 md:space-x-4">
                <button
                  type="button"
                  className="bg-slate-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleEdit(task.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="bg-red-700 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
