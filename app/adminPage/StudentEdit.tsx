"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth/auth";
import { deleteStudent, updateStudent } from "@/lib/db/students";

import { Department, Student } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  students: Student[];
  departments: Department[];
};

const StudentEdit = (props: Props) => {
  const router = useRouter();
  const [studentId, setStudentId] = useState<string>();
  const [student, setStudent] = useState<Student>({
    id: "",
    username: "",
    password: "",
    email: "",
    semester: "",
    departmentId: "",
  });

  useEffect(() => {
    const student = props.students.find((student) => student.id === studentId);
    if (student) setStudent(student);
  }, [studentId, props.students]);

  const Update = async () => {
    const res = await updateStudent(student.id, student);
    if (res) router.replace("/adminPage");
    else alert("not able to update student");
  };

  const Delete = async () => {
    const res = await deleteStudent(student.id);
    if (res) router.replace("/adminPage");
    else alert("not able to delete student");
  };

  return (
    <Card className="p-4 w-[60%] mx-auto mt-4 text-center flex flex-col gap-6">
      <CardHeader>
        <CardTitle>Edit Student Details</CardTitle>
        <CardDescription className="text-sm">
          Update or Delete Students
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select value={studentId} onValueChange={setStudentId}>
          <SelectTrigger className="w-[80%] mx-auto">
            <SelectValue placeholder="select a student to either update or delete" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Students</SelectLabel>
              {props.students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.username}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="mx-auto w-[80%] flex justify-between items-center gap-[-2]">
          <Label htmlFor="username">Enter Username</Label>
          <Input
            name="username"
            value={student?.username}
            onChange={(e) =>
              setStudent({ ...student, username: e.target.value })
            }
            className="w-[40%] flex justify-end"
            required
          ></Input>
        </div>

        <div className="mx-auto w-[80%] flex justify-between items-center gap-[-2]">
          <Label htmlFor="password">Enter Password</Label>
          <Input
            name="password"
            value={student?.password}
            onChange={(e) =>
              setStudent({ ...student, password: e.target.value })
            }
            className="w-[40%] flex justify-end"
            required
          ></Input>
        </div>

        <div className="mx-auto w-[80%] flex justify-between items-center gap-[-2]">
          <Label htmlFor="email">Enter Email</Label>
          <Input
            name="email"
            value={student?.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
            className="w-[40%] flex justify-end"
            required
          ></Input>
        </div>

        <div className="flex justify-between w-[80%] mx-auto">
          <Select
            name="semester"
            value={student?.semester}
            onValueChange={(e) => setStudent({ ...student, semester: e })}
            required
          >
            <SelectTrigger className="w-[30%]">
              <SelectValue placeholder="Select a semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
              <SelectItem value="3">Semester 3</SelectItem>
              <SelectItem value="4">Semester 4</SelectItem>
              <SelectItem value="5">Semester 5</SelectItem>
              <SelectItem value="6">Semester 6</SelectItem>
              <SelectItem value="7">Semester 7</SelectItem>
              <SelectItem value="8">Semester 8</SelectItem>
            </SelectContent>
          </Select>
          <Select
            name="department"
            value={student?.departmentId}
            onValueChange={(e) => setStudent({ ...student, departmentId: e })}
            required
          >
            <SelectTrigger className="w-[30%]">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              {props.departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-[80%] mx-auto flex justify-between">
          <Button onClick={Update}>Update</Button>
          <Button onClick={Delete}>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default StudentEdit;
