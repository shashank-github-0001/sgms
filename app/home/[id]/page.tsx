"force-dynamic";
import InfoCard from "./InfoCard";
import Comments from "./Comments";
import { getGrievances } from "@/lib/db/grievance";
import { GrievanceCategory, Grievances, Student } from "@prisma/client";
import { getGrievanceCategory } from "@/lib/db/category";
import { getStudent } from "@/lib/db/students";
import { getGrievanceComments } from "@/lib/db/grievanceComments";
import Header from "@/components/header";

const Grievance = async ({ params }: { params: { id: string } }) => {
  const grievance = await getGrievances(params.id);
  const cat = await getGrievanceCategory(grievance?.categoryId as string);
  const student = await getStudent(grievance?.studentId as string);
  const comments = await getGrievanceComments(params.id);
  return (
    <>
      <div className="h-screen">
        <Header />
        <div className="flex w-screen h-screen">
          <div className="w-1/2 p-8">
            <InfoCard
              grievance={grievance as Grievances}
              category={cat as GrievanceCategory}
              student={student as Student}
            />
          </div>

          <div className="w-1/2 p-8">
            <Comments
              grievanceId={params.id}
              comments={comments}
              student={student as Student}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Grievance;
