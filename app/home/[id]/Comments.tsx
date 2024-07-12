"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GrievanceComments, Student } from "@prisma/client";
import { createGrievanceComments } from "@/lib/db/grievanceComments";

type Props = {
  comments: GrievanceComments[];
  grievanceId: string;
  student: Student;
};

const Comments = (props: Props) => {
  const [comments, setComments] = useState<GrievanceComments[]>(props.comments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const minute = date.getMinutes();
    const hours = date.getHours();
    if (newComment.trim() !== "") {
      const comment = {
        id: crypto.randomUUID(),
        grievanceId: props.grievanceId,
        text: newComment,
        date: `${year}-${month}-${day} ${hours}:${minute}`,
      };
      const res = await createGrievanceComments(comment);
      if (!res) alert("not able to send comment to the db");
      setComments([...comments, comment]);
      setNewComment("");
    }
  };
  return (
    <Card className="w-full h-full relative shadow-2xl">
      <CardHeader>
        <CardTitle>Comment Box</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto h-[calc(100%-96px)]">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-muted p-4 rounded-md shadow-sm">
            <div className="font-medium">{comment.date}</div>
            <p className="text-muted-foreground">{comment.text}</p>
          </div>
        ))}
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full bg-background px-4 py-2 border-t rounded-xl gap-6">
        <div className="flex items-center rounded gap-6">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded"
          />
          <Button onClick={handleCommentSubmit}>Submit</Button>
        </div>
      </div>
    </Card>
  );
};

export default Comments;
