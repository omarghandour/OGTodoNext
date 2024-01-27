import Home from "@/components/Home";
import React from "react";
import { getTodos } from "../actions/Todos";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const coo = cookies().get("user");
  if (!coo) redirect("/auth");
  const { data } = await getTodos();
  return (
    <div className="h-[100svh]">
      <Home data={data} />
    </div>
  );
};

export default page;
