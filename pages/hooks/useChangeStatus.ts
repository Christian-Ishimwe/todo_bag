// hooks/useChangeStatus.ts
import { toast } from 'react-toastify';
import { changeStatus } from '../api/todoactions';
export const useChangeStatus = (onTaskUpdated: () => void) => {
  const handleStatusChange = async (id: string, done: boolean) => {
    try {
      await changeStatus(id, done);
      toast.success('Task status updated successfully');
      onTaskUpdated();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return { handleStatusChange };
};
