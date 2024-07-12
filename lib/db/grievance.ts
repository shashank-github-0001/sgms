"use server";
import { Grievances } from "@/zod/schema";
import prisma from "@/lib/db/db";
import { Grievances as Grievancetype } from "@prisma/client";

export async function getAllGrievances() {
  return await prisma.grievances.findMany();
}

export async function getGrievances(id: string) {
  return await prisma.grievances.findUnique({
    where: { id },
  });
}

export async function createGrievances(data: Grievancetype) {
  return await prisma.grievances.create({ data });
}

export async function deleteGrievances(id: string) {
  const count = await prisma.grievances.count({
    where: { id },
  });
  if (count > 0) return await prisma.grievances.delete({ where: { id } });
  else throw new Error("no records found to delete the grievance");
}

export async function updateGrievances(id: string, data: Grievancetype) {
  const grievance = Grievances.safeParse(data);
  if (grievance.success)
    return await prisma.grievances.update({ where: { id }, data });
  else return false;
}
