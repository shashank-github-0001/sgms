import Cards from "./Cards";
import { Button } from "@/components/ui/button";
import { getAllGrievanceCategory } from "@/lib/db/category";
import { getAllGrievances } from "@/lib/db/grievance";
import Link from "next/link";

const Home = async () => {
  const grievanceArray = await getAllGrievances();
  const GrievanceCategoryArray = await getAllGrievanceCategory();

  return (
    <div>
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
                <Button variant={"secondary"} className="text-md">
                  LogOut
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="py-8 px-6">
        <Cards
          grievanceArray={grievanceArray}
          catArray={GrievanceCategoryArray}
        />
      </section>
    </div>
  );
};

export default Home;
