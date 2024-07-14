import Header from "@/components/header";
import Form from "./Form";
import { getAllGrievanceCategory } from "@/lib/db/category";

const AddGrievance = async () => {
  const catArray = await getAllGrievanceCategory();

  return (
    <>
      <Header />
      <Form catArray={catArray} />;
    </>
  );
};

export default AddGrievance;
