import React, { useState, useEffect } from "react";

import day from "dayjs";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

import { getRecentPosts } from "../services/getRecentPosts";
import { getSimilarPosts } from "../services/getSimilarPosts";
import {
  GetRecentedPostsQuery,
  GetSimilarPostsQuery,
} from "../generated-graphql/graphql";

interface ComponentProps {
  categories?: string[];
  slug?: string;
}

type RelatedPostsType =
  | GetRecentedPostsQuery["posts"]
  | GetSimilarPostsQuery["posts"];

export default function PostWidget({ categories, slug }: ComponentProps) {
  const { data: recentPosts } = useSWR(
    !slug ? "recentPosts" : null,
    getRecentPosts
  );
  const { data: similarPosts } = useSWR(
    slug && categories ? [slug, categories] : null,
    (slug, categories) => getSimilarPosts(slug, categories)
  );

  const [relatedPosts, setRelatedPosts] = useState<RelatedPostsType>();

  useEffect(() => {
    if (slug) {
      setRelatedPosts(similarPosts);
    } else {
      setRelatedPosts(recentPosts);
    }
  }, [recentPosts, similarPosts, slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts?.map((post) => {
        return (
          <div key={post.title} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                height="60px"
                width="60px"
                className="align-middle rounded-full"
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {day(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link
                href={`/post/${post.slug}`}
                key={post.title}
                className="text-md"
              >
                {post.title}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
