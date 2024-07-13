import ClientComp from "./ClientComp";
import { getAllStudents } from "@/lib/db/students";

const adminPage = async () => {
  const students = await getAllStudents();
  return <ClientComp students={students} />;
};

export default adminPage;
