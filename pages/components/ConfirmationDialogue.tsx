import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Content className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
        <Dialog.Title className="text-lg font-bold">Confirm Deletion</Dialog.Title>
        <Dialog.Description className="mt-2">Are you sure you want to delete this task?</Dialog.Description>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-1 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-1 px-4 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ConfirmationDialog;
