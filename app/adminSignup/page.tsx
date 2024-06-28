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
import { AdminType, DepartmentType } from "@/zod/schema";
import { getAllDepartments } from "@/lib/db/dept";

export default function Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [departmentArray, setDepartmentArray] = useState<DepartmentType[]>([]);
  const [department, setDepartment] = useState<DepartmentType>();

  useEffect(() => {
    async function displayDepartments() {
      const allDepartments = await getAllDepartments();
      setDepartmentArray(allDepartments);
    }
    displayDepartments();
  }, []);

  /*
   * there is some error that if i select the department check if the value is getting registered
   */

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Sign Up</CardTitle>
          <CardDescription>
            Create a new admin account for your organization.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
            <Label htmlFor="department">Department</Label>
            <Select
              name="department"
              onValueChange={(e) => setDepartment(e)}
              value={department?.name}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {departmentArray.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-4">
          <Button variant="outline" className="flex-1">
            Sign In
          </Button>
          <Button type="submit" className="flex-1">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
