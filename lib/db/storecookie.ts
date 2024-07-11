"use client";
import { Student } from "@prisma/client";

const storeCookie = (data: Student) => {
  const studentData = JSON.stringify(data);
  localStorage.removeItem("user");
  localStorage.removeItem("admin");
  localStorage.setItem("user", studentData);
  console.log("stored cookie", studentData);
};

const fetchCookit = (data: Student) => {
  const studentData = JSON.parse(localStorage.getItem("user") as string);
  return studentData;
};

export { storeCookie };
