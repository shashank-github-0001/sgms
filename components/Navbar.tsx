import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b-2 bg-background px-4 md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 font-bold"
        prefetch={false}
      >
        <span>SGMS</span>
      </Link>
      <Link href="/adminLogin">
        <Button className="rounded-md px-4 py-2 text-sm font-medium">
          Admin Login
        </Button>
      </Link>
    </header>
  );
}
