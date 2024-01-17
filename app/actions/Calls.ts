"use server";
import { revalidatePath } from "next/cache";
import { addTodos, deleteTodo, editTodo } from "./Todos";

export const Call1 = async (FormData: FormData, taskID: string) => {
  await editTodo(taskID, FormData);
  revalidatePath("/todos");
};
export const Call2 = async (FormData: FormData) => {
  await addTodos(FormData);
  revalidatePath("/todos");
};
export const Call3 = async (id: string) => {
  const data = await deleteTodo(id);
  if (data?.success === true) revalidatePath("/todos");
};
