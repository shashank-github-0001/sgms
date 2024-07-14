"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const Header = () => {
  const router = useRouter();

  // useLayoutEffect(() => {
  //   const user = localStorage.getItem("user");
  //   const admin = localStorage.getItem("admin");
  //   if (!user && !admin) {
  //     router.replace("/");
  //   }
  // }, [router]);

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    router.replace("/");
  };
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <nav className="flex justify-between items-center">
        <Link href="/home" className="text-xl font-bold">
          Grievance Tracker
        </Link>
        <ul className="flex space-x-4 justify-between items-center gap-4">
          <li>
            <Link href="/addGrievances" className="hover:underline">
              Create Grievance
            </Link>
          </li>
          <li>
            <Link href="/adminPage" className="hover:underline">
              Admin Page
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Button
                variant={"secondary"}
                className="font-bold text-lg"
                onClick={Logout}
              >
                LogOut
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
