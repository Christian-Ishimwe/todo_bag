import { v4 as uuidv4 } from 'uuid';
import db from './db/drizzle';
import { todo } from './db/schema';
import {revalidatePath} from "next/cache";
import { eq } from 'drizzle-orm';

export const addTodo=async (task:string)=>{
    const id= uuidv4()
    await db.insert(todo).values({id:id, task:task});
}

export const getTodo= async()=>{
    const data= await db.select().from(todo)
    return data
}

export const deleteTodo= async(id: string)=>{
    await db.delete(todo).where(eq(todo.id, id))
}
    