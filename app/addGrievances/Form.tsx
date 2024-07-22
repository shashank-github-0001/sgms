"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createGrievances } from "@/lib/db/grievance";
import { GrievanceCategory, Grievances, Status } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Form = ({ catArray }: { catArray: GrievanceCategory[] }) => {
  const router = useRouter();
  const [form, setForm] = useState<Grievances>({
    id: crypto.randomUUID() as string,
    title: "" as string,
    desc: "" as string,
    categoryId: "" as string,
    studentId: "" as string,
    status: "Open" as Status,
  });

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    setForm({ ...form, studentId: user.id });
    const res = await createGrievances(form);
    if (res) router.push("/home");
    else alert("not able to create grievance");
  };


  return (
    <section className="w-full max-w-md mx-auto py-12 md:py-24">
      <div className="px-4 md:px-6 border shadow-sm p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Add Your Grievances Here
          </h1>
        </div>
        <div className="grid gap-2 mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            placeholder="Enter a title for your grievance"
            value={form?.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2 mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            placeholder="Provide details about your grievance"
            className="min-h-[120px]"
            value={form?.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2 mb-4">
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            onValueChange={(e) => setForm({ ...form, categoryId: e })}
            value={form?.categoryId}
            defaultValue={"Select a category"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {catArray.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name.split(" ")[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          Submit Grievance
        </Button>
      </div>
    </section>
  );
};

export default Form;
