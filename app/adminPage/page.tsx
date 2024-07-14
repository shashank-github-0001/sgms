import { getAllStudents } from "@/lib/db/students";
import StudentEdit from "./StudentEdit";
import { getAllDepartments } from "@/lib/db/dept";
import DepartmentEdit from "./DepartmentEdit";
import GrievanceCat from "./GrievanceCat";
import { getAllGrievanceCategory } from "@/lib/db/category";

const adminPage = async () => {
  const students = await getAllStudents();
  const departments = await getAllDepartments();
  const grievanceCats = await getAllGrievanceCategory();
  return (
    <div className="flex flex-col gap-6">
      <StudentEdit students={students} departments={departments} />
      <DepartmentEdit departments={departments} />
      <GrievanceCat grievanceCats={grievanceCats} />h
    </div>
  );
};

export default adminPage;
