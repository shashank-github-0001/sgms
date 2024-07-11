"use server";
import { PrismaClient } from "@prisma/client";
import { StudentType, Student } from "@/zod/schema";

const prisma = new PrismaClient();

export async function createStudent(data: StudentType) {
  const student = Student.safeParse(data);
  if (student.success) return await prisma.student.create({ data });
  else throw new Error("unable to safe parse student data");
}

export async function getStudent(id: string) {
  return await prisma.student.findUnique({
    where: { id },
  });
}

export async function getStudentByName(username: string) {
  return await prisma.student.findFirst({
    where: { username },
  });
}

export async function getAllStudents() {
  return await prisma.student.findMany();
}

export async function updateStudent(id: string, data: StudentType) {
  const student = Student.safeParse(data);
  if (student.success)
    return await prisma.student.update({ where: { id }, data });
  else throw new Error("unable to safe parse student data");
}

export async function deleteStudent(id: string) {
  const count = await prisma.student.count({
    where: { id },
  });
  if (count > 0) return await prisma.student.delete({ where: { id } });
  else throw new Error("unable to delete student");
}
