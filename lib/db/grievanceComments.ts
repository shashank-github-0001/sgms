import { GrievanceComments, GrievanceCommentsType } from "@/app/_zod/schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createGrievanceComments(data: GrievanceCommentsType) {
  const grievance = GrievanceComments.safeParse(data);
  if (grievance.success) return await prisma.grievanceComments.create({ data });
  else throw new Error("unable to safe parse comment data");
}

export async function getGrievanceComments(id: string) {
  return await prisma.grievanceComments.findUnique({
    where: { id },
  });
}

export async function getAllGrievanceComments() {
  return await prisma.grievanceComments.findMany();
}

export async function updateGrievanceComments(
  id: string,
  data: GrievanceCommentsType
) {
  const comment = GrievanceComments.safeParse(data);
  if (comment.success)
    return await prisma.grievanceComments.update({ where: { id }, data });
  else throw new Error("unable to safe parse comment data");
}

export async function deleteGrievanceComments(id: string) {
  const count = await prisma.grievanceComments.count({
    where: { id },
  });
  if (count > 0)
    return await prisma.grievanceComments.delete({ where: { id } });
  else throw new Error("no records found to delete the comment");
}
