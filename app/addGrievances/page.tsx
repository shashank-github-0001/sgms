import Form from "./Form";
import { getAllGrievanceCategory } from "@/lib/db/category";

const AddGrievance = async () => {
  const catArray = await getAllGrievanceCategory();

  return <Form catArray={catArray} />;
};

export default AddGrievance;
