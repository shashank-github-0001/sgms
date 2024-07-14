"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GrievanceCategory, Grievances, Status, Student } from "@prisma/client";
import { updateGrievances } from "@/lib/db/grievance";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  grievance: Grievances;
  category: GrievanceCategory;
  student: Student;
};

const InfoCard = (props: Props) => {
  const [grievanceStatus, setGrievanceStatus] = useState<string>();
  const router = useRouter();
  const updateGrievanceStatus = async () => {
    const res = await updateGrievances(props.grievance.id, {
      ...props.grievance,
      status: grievanceStatus as Status,
    });
    if (res) router.replace("/home");
    else alert("not able to update");
  };
  return (
    <>
      <Card className="h-full flex flex-col justify-around shadow-2xl">
        <CardHeader className="flex flex-col justify-between">
          <CardTitle>Grievance Description</CardTitle>
          <CardDescription>{props.grievance.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="grievance-title">{props.category.name}</Label>
            <p id="grievance-title">{props.grievance.title}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="grievance-description">Grievance Description</Label>
            <p id="grievance-description">{props.grievance.desc}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="grievance-author">Grievance Author</Label>
            <p id="grievance-author">
              <Link
                href={`/studentInfo/${props.student.id}`}
                className="hover:underline"
              >
                {props.student.username}
              </Link>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="grievance-status">Grievance Status</Label>
            <Select value={grievanceStatus} onValueChange={setGrievanceStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={updateGrievanceStatus} className="mx-auto">
            Submit Status
          </Button>
        </CardFooter>
      </Card>
      <div className="bg-muted flex-1" />
    </>
  );
};

export default InfoCard;
