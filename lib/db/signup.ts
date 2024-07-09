"use server";
import { Student } from "@prisma/client";
import prisma from "./db";
import { storeCookie } from "./storecookie";

const signUp = async (data: Student) => {
  const res = await prisma.student.create({ data });
  if (res) {
    storeCookie(res);
    return res;
  } else null;
};

export { signUp };
