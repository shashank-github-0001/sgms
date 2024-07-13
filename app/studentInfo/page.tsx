import { getAllStudents } from "@/lib/db/students";
import Cards from "./Cards";
import { getAllDepartments } from "@/lib/db/dept";

const studentInfo = async () => {
  const students = await getAllStudents();
  const departments = await getAllDepartments();

  return <Cards students={students} department={departments} />;
};

export default studentInfo;
