"use server";
import { GrievanceCategory, GrievanceCategoryType } from "@/zod/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createGrievanceCategory(data: GrievanceCategoryType) {
  const category = GrievanceCategory.safeParse(data);
  if (category.success) return await prisma.grievanceCategory.create({ data });
  else throw new Error("unable to safe parse category data");
}

export async function getAllGrievanceCategory() {
  return await prisma.grievanceCategory.findMany();
}

export async function getGrievanceCategory(id: string) {
  return await prisma.grievanceCategory.findUnique({ where: { id } });
}

export async function deleteGrievanceCategory(id: string) {
  const count = await prisma.grievanceCategory.count({ where: { id } });
  if (count > 0)
    return await prisma.grievanceCategory.delete({ where: { id } });
  else throw new Error("no records found to delete the category");
}
