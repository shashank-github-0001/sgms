"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Student, DepartmentType } from "@/zod/schema";
import { getAllDepartments } from "@/lib/db/dept";
import { createStudent } from "@/lib/db/students";
import Link from "next/link";

export default function Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [semester, setSemester] = useState("");
  const [departmentArray, setDepartmentArray] = useState<DepartmentType[]>([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    async function displayDepartments() {
      const allDepartments = await getAllDepartments();
      setDepartmentArray(allDepartments);
    }
    displayDepartments();
  }, []);

  async function handleSubmit() {
    const student = Student.safeParse({
      id: crypto.randomUUID(),
      username,
      password,
      email,
      phone_no: phone,
      semester: semester,
      departmentId: department,
    });
    console.log(student);

    if (student.success) {
      const response = await createStudent(student.data);
      alert("Student created successfully");
    } else {
      alert("unable to create student");
    }

    setUsername("");
    setPassword("");
    setEmail("");
    setDepartment("");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Student SignUp</CardTitle>
          <CardDescription>
            Create your account to access our student portal.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                name="semester"
                value={semester?.toString()}
                onValueChange={(value) => setSemester(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                name="department"
                value={department?.toString()}
                onValueChange={(value) => setDepartment(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentArray.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <Link className="w-full" href="/studentLogin">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
          <Button className="w-full" onClick={() => handleSubmit()}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
