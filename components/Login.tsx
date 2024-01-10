"use client";
import { login } from "@/app/actions/LoginAction";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{pending ? "Logging in " : "Submit"}</Button>
  );
};
const Login = (logout: any) => {
  const router = useRouter();
  const [isLogIn, setIsLogin] = useState(true);
  const [cookies, setCookies] = useState<string>();
  const viewLogin = (status: boolean) => {
    setIsLogin(status);
  };

  // to handle errors
  const { toast } = useToast();
  const client = async (FormData: FormData) => {
    const resualt = await login(FormData);
    if (resualt?.error) {
      toast({
        title: "Error",
        description: resualt?.error,
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <form action={client} className="flex flex-col ">
        <input
          className="m-1 p-2 rounded-md"
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          required
          className="m-1 p-2 rounded-md"
          name="password"
          type="password"
          placeholder="password"
        />
        {!isLogIn && (
          <input
            required
            className="m-1 p-2 rounded-md"
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
          />
        )}
        <div className=" flex ">
          <div
            className="mt-1 mb-1 cursor-pointer bg-black w-[45%] m-auto text-white p-2 rounded-md text-center hover:bg-slate-800"
            onClick={() => viewLogin(false)}
          >
            Sign Up
          </div>
          <div
            className="mt-1 mb-1 cursor-pointer bg-black w-[45%] m-auto text-white p-2 rounded-md text-center hover:bg-slate-800"
            onClick={() => viewLogin(true)}
          >
            Login
          </div>
        </div>
        <Submit />
      </form>
    </div>
  );
};

export default Login;
