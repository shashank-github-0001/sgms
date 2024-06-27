"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { useState } from "react";
import { Department } from "@prisma/client";
import Link from "next/link";
import { MouseEvent } from "react";
import { StudentType } from "@/zod/schema";
import { getStudentByName } from "@/lib/db/students";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const router = useRouter();

  async function handleSubmit(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    const user = await getStudentByName(username);
    if (!user) {
      alert("Username does not exist");
    } else if (user.password !== password) {
      alert("Wrong Password");
    } else {
      router.replace("grievanceFeed");
    }
  }

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex min-h-full items-center justify-center bg-background">
        <Card className="w-full max-w-md border-2 shadow-xl p-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center mb-2">
              Login
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="KingOfDeath_0001"
                required
                className="mb-4 border-2 border-gray-500"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                required
                className="mb-4 border-2 border-gray-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full flex justify-around">
              <Button type="submit" className="w-2/5" onClick={handleSubmit}>
                Sign in
              </Button>
              <Link href="/studentSignup" className="w-2/5">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
