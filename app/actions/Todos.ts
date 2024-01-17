"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const addTodos = async (FormData: FormData) => {
  const date = new Date().toLocaleString("en-US", {
    year: "numeric",
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });
  const today = new Date().toLocaleString("en-US", {
    day: "numeric",
  });
  const id = uuidv4();
  const name = FormData.get("name");
  const process = FormData.get("process");
  const email = cookies().get("user")?.value;
  try {
    if (email && name && process) {
      await prisma.todos.create({
        data: {
          id: id as any,
          user_email: email as string,
          title: name as string,
          progress: +process as number,
          date: date as string,
          todayy: +today as number,
        } as any,
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error,
    };
  }
};
export const deleteTodo = async (id: any) => {
  const email = cookies().get("user")?.value;
  try {
    await prisma.todos.delete({
      where: {
        id: id as string,
        user_email: email as string,
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
};
export const editTodo = async (id: any, FormData: FormData) => {
  const date = new Date().toLocaleString("en-US", {
    year: "numeric",
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });
  const today = new Date().toLocaleString("en-US", {
    day: "numeric",
  });
  const name = FormData.get("name");
  const email = cookies().get("user")?.value;
  const process: any = FormData.get("process");
  const taskID: string = id;
  try {
    await prisma.todos.update({
      where: {
        id: taskID as string,
        user_email: email as string,
      },
      data: {
        title: name as string,
        progress: +process as number,
        date: date as string,
        todayy: +today as number,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// fetch
export const getTodos = async () => {
  const email = cookies().get("user")?.value;
  try {
    const data = await prisma.todos.findMany({
      where: {
        user_email: email,
      },
    });
    return { data: data };
  } catch (error) {
    console.log(error);
    return {
      error: error,
    };
  }
};
