import { GrievanceCategoryType } from "@/zod/schema";
import { prisma } from "@/lib/db";

export default async function Home() {
  return <h1>Hello World from Home</h1>;
}
