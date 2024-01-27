"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/Logout";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ui/DLMode";
import Link from "next/link";

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
      <ModeToggle />

      <form className=" mt-2" action={client}>
        <Submit />
      </form>
    </div>
  );
};

export default Header;
