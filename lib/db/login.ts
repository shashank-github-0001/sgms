"use server";
import prisma from "./db";

const verifyLogin = async (username: string, password: string) => {
  const res = await prisma.student.findFirst({
    where: { username, password },
  });
  if (res) return res;
  else return false;
};

export { verifyLogin };
