"use server";

import { Admin, AdminType } from "@/zod/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createAdmin(data: AdminType) {
  const admin = Admin.safeParse(data);
  if (admin.success) return await prisma.admin.create({ data });
  else throw new Error("unable to safe parse admin data");
}

export async function getAdmin(id: string) {
  return await prisma.admin.findUnique({
    where: { id },
  });
}

export async function getAdminByName(username: string) {
  return await prisma.admin.findUnique({
    where: { username },
  });
}

export async function getAllAdmin() {
  return await prisma.admin.findMany();
}

export async function updateAdmin(id: string, data: AdminType) {
  const admin = Admin.safeParse(data);
  if (admin.success) return await prisma.admin.update({ where: { id }, data });
  else throw new Error("unable to safe parse admin data");
}

export async function depeteAdmin(id: string) {
  const admin = await prisma.admin.count({ where: { id } });
  if (admin > 0) return await prisma.admin.delete({ where: { id } });
  else throw new Error("no records found to delete the admin");
}
