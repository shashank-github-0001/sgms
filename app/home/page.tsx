"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grievances } from "@prisma/client";
import prisma from "@/lib/db/db";

export default function Component() {
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [grievance, setGrievance] = useState<Grievances[]>();

  useEffect(() => {
    const fetchGrievances = async () => {
      "use server";
      const data = await prisma.grievances.findMany();
    };
  });

  const grievances = [
    {
      id: 1,
      type: "Noise Pollution",
      status: "Pending",
      description:
        "Loud construction noise in the neighborhood during late hours.",
    },
    {
      id: 2,
      type: "Littering",
      status: "Resolved",
      description: "Excessive litter and garbage accumulation on the street.",
    },
    {
      id: 3,
      type: "Illegal Dumping",
      status: "Pending",
      description: "Illegal dumping of hazardous waste in a public park.",
    },
    {
      id: 4,
      type: "Noise Pollution",
      status: "Resolved",
      description:
        "Blaring music from a nearby club keeping residents awake at night.",
    },
    {
      id: 5,
      type: "Littering",
      status: "Pending",
      description: "Overflowing trash cans and litter on the sidewalks.",
    },
  ];
  const filteredGrievances = grievances.filter((grievance) => {
    if (filterType === "all" && filterStatus === "all") {
      return true;
    }
    if (filterType !== "all" && filterStatus === "all") {
      return grievance.type === filterType;
    }
    if (filterType === "all" && filterStatus !== "all") {
      return grievance.status === filterStatus;
    }
    return grievance.type === filterType && grievance.status === filterStatus;
  });
  return (
    <div>
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <nav className="flex justify-between items-center">
          <Link href="#" className="text-xl font-bold" prefetch={false}>
            Grievance Tracker
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="#" className="hover:underline" prefetch={false}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline" prefetch={false}>
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline" prefetch={false}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by Type</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterType === "all"}
                onCheckedChange={() => setFilterType("all")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Noise Pollution"}
                onCheckedChange={() => setFilterType("Noise Pollution")}
              >
                Noise Pollution
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Littering"}
                onCheckedChange={() => setFilterType("Littering")}
              >
                Littering
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType === "Illegal Dumping"}
                onCheckedChange={() => setFilterType("Illegal Dumping")}
              >
                Illegal Dumping
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterStatus === "all"}
                onCheckedChange={() => setFilterStatus("all")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Pending"}
                onCheckedChange={() => setFilterStatus("Pending")}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Resolved"}
                onCheckedChange={() => setFilterStatus("Resolved")}
              >
                Resolved
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGrievances.map((grievance) => (
            <Card key={grievance.id}>
              <CardHeader>
                <CardTitle>{grievance.type}</CardTitle>
                <Badge
                  variant={
                    grievance.status === "Pending" ? "warning" : "success"
                  }
                >
                  {grievance.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p>{grievance.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
