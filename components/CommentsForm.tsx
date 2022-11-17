import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";
import { toast } from "react-hot-toast";
import { CreatePostCommentMutationVariables } from "../generated-graphql/graphql";

const submitComment = (body: CreatePostCommentMutationVariables) =>
  mutate("submit-comment", async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

const commentFormSchema = yup
  .object({
    comment: yup.string().required("Can not be empty"),
    name: yup.string().required("Can not be empty"),
    email: yup.string().email().required("Can not be empty"),
  })
  .required();

type CommentFormData = yup.InferType<typeof commentFormSchema>;

interface ComponentProps {
  slug?: string;
}

export default function CommentsForm({ slug }: ComponentProps) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: yupResolver(commentFormSchema),
  });

  const handlePostComment = handleSubmit((data) => {
    const { comment, email, name } = data;
    submitComment({ name, email, comment, slug }).then(() =>
      toast.success("Comment submitted for review", {
        position: "bottom-center",
      })
    );
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Replay
      </h3>
      <form onSubmit={handlePostComment}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            {...register("comment")}
            placeholder="Comment"
            className="w-full rounded-lg border-gray-200 text-gray-700 h-40 p-4 outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
          {errors["comment"] ? (
            <span role="alert" className="text-red-500 font-bold text-sm">
              {errors["comment"].message}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="w-full rounded-lg border-gray-200 text-gray-700 p-4 outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
          {errors["name"] ? (
            <span role="alert" className="text-red-500 font-bold text-sm">
              {errors["name"].message}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            {...register("email")}
            placeholder="Email"
            className="w-full rounded-lg border-gray-200 text-gray-700 p-4 outline-none focus:ring-2 focus:ring-gray-200 bg-gray-100"
          />
          {errors["email"] ? (
            <span role="alert" className="text-red-500 font-bold text-sm">
              {errors["email"].message}
            </span>
          ) : null}
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
