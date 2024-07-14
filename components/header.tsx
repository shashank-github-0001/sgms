"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth";

const Header = () => {
  const router = useRouter();
  const { logout, isAuthed } = useAuth();

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    logout();
    router.replace("/");
  };

  if (!isAuthed) router.replace("/");

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
              <Button variant={"secondary"} onClick={Logout}>
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
