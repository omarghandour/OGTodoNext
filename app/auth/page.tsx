import React from "react";
import { login } from "../actions/LoginAction";
import Login from "@/components/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  //   const saltRounds = 10;
  const coo = cookies().get("user");
  if (coo) redirect("/todos");
  const SignUp = async () => {
    return <>hello frienf</>;
  };

  return (
    <div className=" container flex h-full justify-center items-center">
      <Login />
    </div>
  );
};

export default page;
