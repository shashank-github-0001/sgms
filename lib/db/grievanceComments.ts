"use server";
import { GrievanceComments } from "@/zod/schema";
import {
  GrievanceComments as GrievanceCommentsType,
  PrismaClient,
} from "@prisma/client";
const prisma = new PrismaClient();

export async function createGrievanceComments(data: GrievanceCommentsType) {
  return await prisma.grievanceComments.create({ data });
}

export async function getGrievanceComments(id: string) {
  return await prisma.grievanceComments.findMany({
    where: { grievanceId: id },
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
