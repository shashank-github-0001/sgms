"use client";
import { Student } from "@prisma/client";

const storeCookie = (data: Student) => {
  const studentData = JSON.stringify(data);
  localStorage.removeItem("user");
  localStorage.setItem("user", studentData);
  console.log("stored cookie", studentData);
};

export { storeCookie };
