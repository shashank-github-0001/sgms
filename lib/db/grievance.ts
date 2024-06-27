import { Grievances, GrievancesType } from "@/app/_zod/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllGrievances() {
  return await prisma.grievances.findMany();
}

export async function getGrievances(id: string) {
  return await prisma.grievances.findUnique({
    where: { id },
  });
}

export async function createGrievances(data: GrievancesType) {
  const grievance = Grievances.safeParse(data);
  if (grievance.success) return await prisma.grievances.create({ data });
  else throw new Error("unable to safe parse grievance data");
}

export async function deleteGrievances(id: string) {
  const count = await prisma.grievances.count({
    where: { id },
  });
  if (count > 0) return await prisma.grievances.delete({ where: { id } });
  else throw new Error("no records found to delete the grievance");
}
