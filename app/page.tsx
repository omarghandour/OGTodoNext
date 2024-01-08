import React from "react";
import { PrismaClient } from "@prisma/client";
import { ModeToggle } from "@/components/ui/DLMode";
import Tasks from "@/components/Tasks";
const prisma = new PrismaClient();
const page = async () => {
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
    </div>
  );
};

export default page;
