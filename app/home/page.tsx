import Header from "@/components/header";
import Cards from "./Cards";
import { getAllGrievanceCategory } from "@/lib/db/category";
import { getAllGrievances } from "@/lib/db/grievance";

const Home = async () => {
  const grievanceArray = await getAllGrievances();
  const GrievanceCategoryArray = await getAllGrievanceCategory();
  return (
    <div>
      <Header />
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
