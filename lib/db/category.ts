import { Category, CategoryType } from "@/app/_zod/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createCategory(data: CategoryType) {
  const category = Category.safeParse(data);
  if (category.success) return await prisma.category.create({ data });
  else throw new Error("unable to safe parse category data");
}

export async function getAllCategory() {
  return await prisma.category.findMany();
}

export async function getCategory(id: string) {
  return await prisma.category.findUnique({ where: { id } });
}

export async function deleteCategory(id: string) {
  const count = await prisma.category.count({ where: { id } });
  if (count > 0) return await prisma.category.delete({ where: { id } });
  else throw new Error("no records found to delete the category");
}
