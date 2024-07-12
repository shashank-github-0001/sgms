"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { GrievanceCategory, Grievances } from "@prisma/client";
import {
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
const Cards = ({
  catArray,
  grievanceArray,
}: {
  catArray: GrievanceCategory[];
  grievanceArray: Grievances[];
}) => {
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const router = useRouter();
  return (
    <>
      <div className="flex justify-start mb-6 gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter by Type</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filterType}
              onValueChange={setFilterType}
            >
              <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
              {catArray?.map((cat) => (
                <DropdownMenuRadioItem key={cat.id} value={cat.id}>
                  {cat.name.split(" ")[0]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter by Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Open">Open</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="InProgress">
                InProgress
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Resolved">
                Resolved
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Closed">
                Closed
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {grievanceArray
          ?.filter(
            (grievance) =>
              (filterType === "All" || filterType === grievance.categoryId) &&
              (filterStatus === "All" || filterStatus === grievance.status)
          )
          .map((grievance) => (
            <Card
              key={grievance.id}
              className="h-full flex flex-col justify-between items-start"
            >
              <CardHeader>
                <CardTitle>{grievance.title}</CardTitle>
                <CardDescription>{grievance.status}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{grievance.desc.slice(0, 80) + "..."}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="default"
                  onClick={() => router.push(`/home/${grievance.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Cards;
