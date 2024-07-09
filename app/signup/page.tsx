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
import { Student } from "@prisma/client";
import { signUp } from "@/lib/db/signup";
import { storeCookie } from "@/lib/db/storecookie";
import prisma from "@/lib/db/db";
const Signup = async () => {
  const departments = await prisma.department.findMany();
  const handleSignUp = async (formData: FormData) => {
    "use server";
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const semester = formData.get("semester");
    const department = formData.get("department");
    const data: Student = {
      id: crypto.randomUUID(),
      username,
      password,
      email: email as string,
      semester: semester as string,
      departmentId: department as string,
    };
    const res = await signUp(data);
    if (res) storeCookie(data);
    else alert("not able to create user please refresh or restart the server");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-background shadow-sm">
      <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <form className="space-y-4" action={handleSignUp}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              type="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select name="semester" required>
                <SelectTrigger className="w-full">
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select name="department" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
