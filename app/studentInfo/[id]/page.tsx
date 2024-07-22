import { getAllGrievanceCategory } from "@/lib/db/category";
import { getStudentsGrievances } from "@/lib/db/grievance";
import Cards from "./Cards";

const studentInfoId = async ({ params }: { params: { id: string } }) => {
  const grievanceArray = await getStudentsGrievances(params.id);
  const grievanceCategoryArray = await getAllGrievanceCategory();

  return (
    <div>
      <section className="py-8 px-6">
        <Cards
          grievanceArray={grievanceArray}
          catArray={grievanceCategoryArray}
        />
      </section>
    </div>
  );
};

export default studentInfoId;
