import React from "react";
import { PrismaClient } from "@prisma/client";
import { ModeToggle } from "@/components/ui/DLMode";
import Tasks from "@/components/Tasks";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Header from "@/components/Header";
const prisma = new PrismaClient();
const page = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  if (!user) {
    redirect("/auth");
  }
  async function HomeTodos() {
    "use server";
    try {
      const data = await prisma.todos.findMany({
        where: {
          user_email: "todo@gmail.com",
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  const homee = await HomeTodos();
  const mpp = await homee?.map((task) => {
    return task;
  });

  return (
    <div>
      <ModeToggle />
      <div>hiiiiiiii</div>
      <Tasks task={mpp} />
      <Header />
    </div>
  );
};

export default page;
