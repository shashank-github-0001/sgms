import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <nav className="flex justify-between items-center">
        <Link href="#" className="text-xl font-bold">
          Grievance Tracker
        </Link>
        <ul className="flex space-x-4 justify-between items-center gap-4">
          <li>
            <Link href="/addGrievances" className="hover:underline">
              Create Grievance
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Button variant={"secondary"} className="font-bold text-lg">
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
