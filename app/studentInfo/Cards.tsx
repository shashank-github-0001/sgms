"use client";

import { useRouter } from "next/navigation";
import { Student, Department } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Props = {
  students: Student[];
  department: Department[];
};

const Cards = (props: Props) => {
  const getDepName = (id: string) => {
    const dep = props.department.find((dep) => dep.id === id);
    return dep?.name;
  };

  const router = useRouter();
  return (
    <div className="grid grid-cols-4 gap-6 w-screen p-4">
      {props.students?.map((student) => (
        <div key={student.id}>
          <Card className="p-4 text-center">
            <Avatar className="mx-auto w-20 h-20">
              <AvatarFallback className="mx-auto w-full">
                {student.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {student.username}
              </CardTitle>
              <CardDescription>{student.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>semester: {student.semester}</p>
              <p>department: {getDepName(student.departmentId)}</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button onClick={() => router.push(`/studentInfo/${student.id}`)}>
                Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Cards;
