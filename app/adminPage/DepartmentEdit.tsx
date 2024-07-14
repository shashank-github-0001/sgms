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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteDepartment, updateDept } from "@/lib/db/dept";
import { DepartmentType } from "@/zod/schema";
import { Department } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  departments: Department[];
};

const DepartmentEdit = (props: Props) => {
  const router = useRouter();
  const [departmentId, setDepartmentId] = useState<string>();
  const [department, setDepartment] = useState<Department>({
    id: "",
    name: "",
  });
  useEffect(() => {
    const department = props.departments.find(
      (department) => department.id === departmentId
    );
    if (department) setDepartment(department);
  }, [departmentId, props.departments]);

  const Update = async () => {
    if (departmentId !== "") {
      const res = await updateDept(
        departmentId as string,
        department as DepartmentType
      );
      if (res) {
        router.replace("/adminPage");
        setDepartment({ id: "", name: "" });
      } else alert("not able to update department");
    }
  };

  const Delete = async () => {
    if (departmentId !== "") {
      const res = await deleteDepartment(departmentId as string);
      if (res) router.replace("/adminPage");
      else alert("not able to delete department");
    }
  };

  return (
    <Card className="p-4 w-[60%] mx-auto text-center">
      <CardHeader>
        <CardTitle>Edit Department Info</CardTitle>
        <CardDescription>Either Update or Delete Departments</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={departmentId} onValueChange={setDepartmentId}>
          <SelectTrigger className="w-[80%] mx-auto">
            <SelectValue placeholder="select a student to either update or delete" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Students</SelectLabel>
              {props.departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex justify-between items-center w-[80%] mx-auto py-4">
          <Label htmlFor="department-name">Department Name</Label>
          <Input
            name="department-name"
            className="w-[40%] flex justify-end"
            required
            value={department?.name}
            onChange={(e) =>
              setDepartment({ ...department, name: e.target.value })
            }
          ></Input>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-[80%] items-center mx-auto">
          <Button onClick={Update}>Update</Button>
          <Button onClick={Delete}>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DepartmentEdit;
