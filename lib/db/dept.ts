"use server";
import { Department, DepartmentType } from "@/zod/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createDepartment(data: DepartmentType) {
  const department = Department.safeParse(data);
  if (department.success) return await prisma.department.create({ data });
  else throw new Error("unable to safe parse department data");
}

export async function deleteDepartment(id: string) {
  return await prisma.department.delete({ where: { id } });
}

export async function getAllDepartments() {
  return await prisma.department.findMany();
}

export async function updateDept(id: string, data: DepartmentType) {
  const parseddata = Department.safeParse(data);
  if (parseddata.success)
    return await prisma.department.update({ where: { id }, data });
  else return false;
}
