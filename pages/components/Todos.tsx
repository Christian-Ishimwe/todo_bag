'use client';
import { useEditTodo } from '../hooks/useEditTodo';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useChangeStatus } from '../hooks/useChangeStatus';
import React from 'react';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

interface Task {
  id: string;
  done: boolean;
  task: string;
}

interface TodosProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const Todos = ({ tasks = [], onTaskUpdated }: TodosProps) => {
  const { editTaskId, setEditTaskId, editTaskValue, setEditTaskValue, handleEdit } = useEditTodo(onTaskUpdated);
  const { handleDelete } = useDeleteTodo(onTaskUpdated);
  const { handleStatusChange } = useChangeStatus(onTaskUpdated);

  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks available. Add a task to get started!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border-b border-gray-700 flex flex-col md:flex-row md:items-center md:space-x-4 bg-gray-800 rounded-md"
            >
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
                    className="bg-inherit text-white border-none w-full truncate outline-0"
                  />
                </div>
              </div>
              <div className="mt-2 md:mt-0 flex space-x-2 md:space-x-4">
                <Dialog open={editTaskId === task.id} onOpenChange={(open) => !open && setEditTaskId(null)}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="bg-slate-500 text-white w-14 text-sm rounded-md"
                      onClick={() => {
                        setEditTaskId(task.id);
                        setEditTaskValue(task.task);
                      }}
                    >
                      Edit
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit the Task</DialogTitle>
                      <DialogDescription className="mb-3">
                        <Input
                          value={editTaskValue}
                          onChange={(e) => setEditTaskValue(e.target.value)}
                          className="my-4 outline-1"
                        />
                      </DialogDescription>
                      <DialogFooter>
                        <button
                          type="button"
                          className="bg-slate-500 text-white p-2 text-sm rounded-md"
                          onClick={() => setEditTaskId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="bg-slate-900 text-white p-2 text-sm rounded-md"
                          onClick={handleEdit}
                        >
                          Update
                        </button>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      className="bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This task cannot be undone. This will permanently delete your task.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
