"use client";
import { cookies } from "next/headers";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/Logout";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending}>{pending ? "LoggingOut " : "Logout"}</Button>
    );
  };
  const client = async () => {
    const resualt = await logout();
    if (resualt?.LogedOut) router.push("/auth");
  };
  return (
    <div>
      <form action={client}>
        <Submit />
      </form>
    </div>
  );
};

export default Header;
