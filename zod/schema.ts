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

export const Admin = z.object({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  departmentId: z.string().uuid(),
});

export type AdminType = z.infer<typeof Admin>;

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
  categoryId: z.string().uuid(),
  submissionDate: z.date(),
  resolutionDate: z.date(),
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

export const GrievanceAssignments = z.object({
  id: z.string().uuid(),
  adminId: z.string().uuid(),
  grievanceId: z.string().uuid(),
});

export type GrievanceAssignmentsType = z.infer<typeof GrievanceAssignments>;
