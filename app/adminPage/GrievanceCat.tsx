"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GrievanceCategory } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  deleteGrievanceCategory,
  updateGrievanceCategory,
} from "@/lib/db/category";

type Props = {
  grievanceCats: GrievanceCategory[];
};

const GrievanceCat = (props: Props) => {
  const [grievanceCatId, setGrievanceCatId] = useState<string>();
  const [grievanceCat, setGrievanceCat] = useState<GrievanceCategory>({
    id: "",
    name: "",
    desc: "",
  });
  const router = useRouter();

  useEffect(() => {
    const grievanceCat = props.grievanceCats.find(
      (grievance) => grievance.id === grievanceCatId
    );
    if (grievanceCat) setGrievanceCat(grievanceCat);
  }, [grievanceCatId, props.grievanceCats]);

  const Update = async () => {
    if (grievanceCatId !== "") {
      const res = await updateGrievanceCategory(
        grievanceCatId as string,
        grievanceCat as GrievanceCategory
      );
      if (res) {
        router.replace("/adminPage");
        setGrievanceCatId("");
        setGrievanceCat({ id: "", name: "", desc: "" });
      } else alert("not able to update department");
    }
  };

  const Delete = async () => {
    if (grievanceCatId !== "") {
      const res = await deleteGrievanceCategory(grievanceCatId as string);
      if (res) {
        router.replace("/adminPage");
        setGrievanceCatId("");
        setGrievanceCat({ id: "", name: "", desc: "" });
      } else alert("not able to delete department");
    }
  };

  return (
    <Card className="p-4 w-[60%] mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Edit Department Info</CardTitle>
        <CardDescription>Either Update or Delete Departments</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={grievanceCatId} onValueChange={setGrievanceCatId}>
          <SelectTrigger className="w-[80%] mx-auto">
            <SelectValue placeholder="select a student to either update or delete" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Students</SelectLabel>
              {props.grievanceCats.map((grievanceCat) => (
                <SelectItem key={grievanceCat.id} value={grievanceCat.id}>
                  {grievanceCat.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-[80%] mx-auto py-4 gap-6">
          <div className="flex justify-between items-center">
            <Label htmlFor="grievance-cat-name">Grievance Category Name</Label>
            <Input
              name="grievance-cat-name"
              className="w-[40%]"
              required
              value={grievanceCat?.name}
              onChange={(e) =>
                setGrievanceCat({ ...grievanceCat, name: e.target.value })
              }
            ></Input>
          </div>
          <Label htmlFor="grievance-cat-desc" className="gap-6">
            Grievance Category Description
          </Label>
          <Textarea
            placeholder="Grievance Category Description"
            name="grievance-cat-desc"
            className="w-[600px] h-[150px]"
            value={grievanceCat.desc}
            onChange={(e) =>
              setGrievanceCat({ ...grievanceCat, desc: e.target.value })
            }
          ></Textarea>
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

export default GrievanceCat;
