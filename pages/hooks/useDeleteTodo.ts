// hooks/useDeleteTodo.ts
import { toast } from 'react-toastify';
import { deleteTodo } from '../api/todoactions';

export const useDeleteTodo = (onTaskUpdated: () => void) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      toast.success('Task deleted successfully');
      onTaskUpdated();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return { handleDelete };
};
