"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/Logout";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ui/DLMode";

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
    <div className="flex items-center justify-around">
      <ModeToggle />

      <form className=" flex items-center justify-around mt-2" action={client}>
        <Submit />
      </form>
    </div>
  );
};

export default Header;
