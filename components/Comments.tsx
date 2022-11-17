import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { GetCommentsQuery } from "../generated-graphql/graphql";
import { getComments } from "../services/getComments";

interface ComponentProps {
  slug: string;
}

export default function Comments({ slug }: ComponentProps) {
  const { data } = useSWR("comments", () => getComments(slug));
  const [comments, setComments] = useState<GetCommentsQuery["comments"]>([]);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  return (
    <>
      {comments && comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {"  "}
            Comments
          </h3>
          {comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="border-b border-gray-100 mb-4 pb-4"
              >
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span>
                  {"  "}
                  on
                  {"  "}
                  {dayjs(comment.createdAt).format("MMM DD, YYYY")}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">
                  {comment.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
