import React from "react";
import Login from "@/components/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const coo = cookies().get("user");
  if (coo) redirect("/todos");
  const SignUp = async () => {
    return <>hello friend</>;
  };

  return (
    <div className=" container flex h-full justify-center items-center">
      <Login />
    </div>
  );
};

export default page;
