import { z } from "zod";

export const Student = z.object({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  phone_no: z.string(),
  semester: z.string(),
  departmentId: z.string().uuid(),
});

export type StudentType = z.infer<typeof Student>;

export const Department = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type DepartmentType = z.infer<typeof Department>;

const Status = z.union([
  z.literal("Open"),
  z.literal("InProgress"),
  z.literal("Closed"),
  z.literal("Resolved"),
]);

export const Grievances = z.object({
  id: z.string().uuid(),
  title: z.string(),
  desc: z.string(),
  status: Status,
  studentId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export type GrievancesType = z.infer<typeof Grievances>;

export const GrievanceCategory = z.object({
  id: z.string().uuid(),
  name: z.string(),
  desc: z.string(),
});

export type GrievanceCategoryType = z.infer<typeof GrievanceCategory>;

export const GrievanceComments = z.object({
  id: z.string().uuid(),
  grievanceId: z.string().uuid(),
  text: z.string().min(20),
  date: z.date(),
});

export type GrievanceCommentsType = z.infer<typeof GrievanceComments>;
