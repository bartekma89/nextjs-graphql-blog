import React from "react";

import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface Post {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  author: {
    bio?: string | null;
    name?: string;
  };
  createdAt: string;
}

interface ComponentProps {
  post: Post;
}

export default function PostCard({ post }: ComponentProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center lg:w-auto mr-6">
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <CalendarDaysIcon className="h-6 w-6 inline mr-2 text-pink-500" />
          <span className="align-middle">
            {dayjs(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 tranform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
}
