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
  const department = await prisma.department.count({ where: { id } });
  if (department > 0) return await prisma.department.delete({ where: { id } });
  else throw new Error("no records found to delete the department");
}

export async function getAllDepartments() {
  return await prisma.department.findMany();
}
