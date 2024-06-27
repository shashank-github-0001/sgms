import {
  GrievanceAssignments,
  GrievanceAssignmentsType,
} from "@/app/_zod/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createGrievanceAssignments(
  data: GrievanceAssignmentsType
) {
  const assignment = GrievanceAssignments.safeParse(data);
  if (assignment.success)
    return await prisma.grievanceAssignments.create({ data });
  else throw new Error("unable to safe parse assignment data");
}

export async function getGrievanceAssignments(id: string) {
  return await prisma.grievanceAssignments.findUnique({
    where: { id },
  });
}

export async function getAllGrievanceAssignments() {
  return await prisma.grievanceAssignments.findMany();
}

export async function updateGrievanceAssignments(
  id: string,
  data: GrievanceAssignmentsType
) {
  const assignment = GrievanceAssignments.safeParse(data);
  if (assignment.success)
    return await prisma.grievanceAssignments.update({ where: { id }, data });
  else throw new Error("unable to safe parse assignment data");
}

export async function deleteGrievanceAssignments(id: string) {
  const count = await prisma.grievanceAssignments.count({
    where: { id },
  });
  if (count > 0)
    return await prisma.grievanceAssignments.delete({ where: { id } });
  else throw new Error("no records found to delete the assignment");
}
