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
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Admin, DepartmentType } from "@/zod/schema";
import { getAllDepartments } from "@/lib/db/dept";
import { createAdmin } from "@/lib/db/admin";
import Link from "next/link";

export default function Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
    console.log(username, password, department, email);
    const admin = Admin.safeParse({
      id: crypto.randomUUID(),
      username,
      password,
      email,
      departmentId: department,
    });

    if (admin.success) {
      const response = await createAdmin(admin.data);
      alert("Admin created successfully");
    } else {
      alert("unable to create admin");
    }

    setUsername("");
    setPassword("");
    setEmail("");
    setDepartment("");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Sign Up</CardTitle>
          <CardDescription>
            Create a new admin account for your organization.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              name="department"
              onValueChange={(value) => setDepartment(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {departmentArray.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-4">
          <Link href="/adminLogin" className="flex-1">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
          <Button type="submit" className="flex-1" onClick={handleSubmit}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
