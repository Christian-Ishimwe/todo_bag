import React, {useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextArea } from "@radix-ui/themes";
import { addTodo } from "../../api/todoactions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IFormInput {
  task: string;
}



const AddForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [isloading, setLoading]= useState(false)
    const onSubmit: SubmitHandler<IFormInput> =async (data) => {
      setLoading(true)
      try{
        await addTodo(data.task)
        toast.success("Task added Succesful")
      }catch(err:any){
         toast.error(err.message)
      }finally{
        setLoading(false)
      }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-4 max-w-md mx-auto">
      <div className="flex flex-col">
        <TextArea
          id="task"
          placeholder="Enter the task"
          className="border border-gray-300 px-3 py-2 rounded-lg text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          {...register('task', { required: "Task is required" })}
          aria-describedby="task-error"
        />
        {errors.task && (
          <p id="task-error" className="text-red-600 text-sm mt-1">{errors.task.message}</p>
        )}
      </div>

      <Button
        type="submit" 
        className="text-white"
         variant="classic"
          loading={isloading}
          disabled={isloading}
          highContrast
          >
        Add
      </Button>
       <ToastContainer />
    </form>
           

  );
};

export default AddForm;
