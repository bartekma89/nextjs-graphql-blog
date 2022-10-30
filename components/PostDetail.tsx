import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import dayjs from "dayjs";
import Image from "next/image";

import { GetPostDetailsQuery } from "../generated-graphql/graphql";

interface ComponentProps {
  post: GetPostDetailsQuery["post"];
}

export default function PostDetail({ post }: ComponentProps) {
  console.log(post);

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          alt={post?.title}
          src={post!.featuredImage.url}
          width="100"
          height="50"
          layout="responsive"
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
            <div className="flex items-center justify-center lg:w-auto mr-6">
              <p className="inline align-middle text-gray-700 ml-2 text-lg">
                {post?.author!.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <CalendarDaysIcon className="h-6 w-6 inline mr-2 text-pink-500" />
              <span className="align-middle">
                {dayjs(post!.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post?.title}</h1>
      </div>
    </div>
  );
}
