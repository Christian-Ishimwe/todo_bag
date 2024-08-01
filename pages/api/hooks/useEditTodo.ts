// hooks/useEditTodo.ts
import { useState } from 'react';
import { toast } from 'react-toastify';
import { editTodo } from './../todoactions';

export const useEditTodo = (onTaskUpdated: () => void) => {
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskValue, setEditTaskValue] = useState<string>('');

  const handleEdit = async () => {
    if (editTaskId && editTaskValue) {
      try {
        await editTodo(editTaskId, editTaskValue);
        toast.success('Task updated successfully');
        onTaskUpdated();
        setEditTaskId(null);
        setEditTaskValue('');
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return {
    editTaskId,
    setEditTaskId,
    editTaskValue,
    setEditTaskValue,
    handleEdit,
  };
};
