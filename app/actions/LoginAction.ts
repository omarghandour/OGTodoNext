"use server";

import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
type data = {
  email: string;
  password: string;
  passwordConfirmation: string;
};
export const login = async (FormData: FormData) => {
  const email = FormData.get("email");
  const password = FormData.get("password");
  const passwordConfirmation = await FormData.get("confirmPassword");
  const hash = await prisma.users.findUnique({
    where: {
      email: email as string,
    },
  });
  console.log(passwordConfirmation);
  const cookie = cookies().get("user");
  if (cookie?.value === email) redirect("/");
  if (!hash && !passwordConfirmation) {
    return {
      error: "User not found",
    };
  }
  if (hash && !passwordConfirmation) {
    try {
      const match = await bcrypt.compare(
        password as string,
        hash?.hashed_password as string
      );
      //   console.log(match);
      if (match) {
        // const token = jwt.sign({ email }, "token");
        cookies().set({
          name: "user",
          value: email as string,
          httpOnly: true,
        });
      }
    } catch (e) {
      console.log(e);
      return {
        error: "User not found",
      };
    }
  } else {
    // signup lpgic
    try {
      if (password === passwordConfirmation) {
        await prisma.users
          .create({
            data: {
              email: email as string,
              hashed_password: await bcrypt.hash(password as string, 10),
            },
          })
          .then(() => {
            cookies().set({
              name: "user",
              value: email as string,
              httpOnly: true,
            });
          });
      } else {
        return {
          error: "passwords dont match",
        };
      }
    } catch (e) {
      console.log(e);
      return {
        error: "error signing",
      };
    }
  }
};
