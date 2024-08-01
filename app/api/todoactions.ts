import { v4 as uuidv4 } from 'uuid';
import db from './db/drizzle';
import { todo } from './db/schema';
import { eq } from 'drizzle-orm';

export const addTodo = async (task: string, usermail:string) => {
  try {
    const id = uuidv4();
    await db.insert(todo).values({ id:id, task: task, usermail:usermail});

} catch (error) {
    console.error('Error adding todo:', error);
    throw new Error('Failed to add todo');
  }
};

export const getTodo = async (user:string) => {
  try {
    const data = await db.select().from(todo).where(eq(todo.usermail, user))
    .orderBy(todo.done);
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Failed to fetch todos');
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await db.delete(todo).where(eq(todo.id, id));
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Failed to delete todo');
  }
};

export const editTodo = async (id: string, task: string) => {
  try {
    await db.update(todo).set({ task }).where(eq(todo.id, id));
  } catch (error) {
    console.error('Error editing todo:', error);
    throw new Error('Failed to edit todo');
  }
};


export const changeStatus = async (id: string, done: boolean) => {
  try {
    await db.update(todo).set({ done: !done }).where(eq(todo.id, id));
  } catch (error) {
    console.error('Error changing task status:', error);
    throw new Error('Failed to change task status');
  }
};