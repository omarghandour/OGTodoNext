import React from "react";
import { PrismaClient } from "@prisma/client";
import Tasks from "@/components/Tasks";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Link from "next/link";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
const page = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  if (!user) {
    redirect("/todos");
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
    <div className="container p-5">
      <Header />
      <Link
        className=" mt-5 mb-5 bg-black p-2 text-white rounded-md w-[7%] text-center hover:bg-gray-800"
        href={"/todos"}
      >
        Todos
      </Link>
      {/* <Tasks task={mpp} /> */}
    </div>
  );
};

export default page;
