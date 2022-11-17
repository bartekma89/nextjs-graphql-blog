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

type RelatedPostsType =
  | GetRecentedPostsQuery["posts"]
  | GetSimilarPostsQuery["posts"];

type Category = { name: string; slug: string };

interface ComponentProps {
  categories?: Category[];
  slug?: string;
}

export default function PostWidget({ categories, slug }: ComponentProps) {
  const { data: recentPosts } = useSWR(!slug ? "recentPosts" : null, () => {
    return getRecentPosts().finally(() => setLoading(false));
  });
  const { data: similarPosts } = useSWR(
    slug && categories ? [slug, categories] : null,
    (slug, categories) => {
      const mappedCategories = categories.map(({ slug }) => slug);
      return getSimilarPosts(slug, mappedCategories).finally(() =>
        setLoading(false)
      );
    }
  );
  const [loading, setLoading] = useState(true);

  const [relatedPosts, setRelatedPosts] = useState<RelatedPostsType>();

  useEffect(() => {
    if (slug) {
      setRelatedPosts(similarPosts);
    } else {
      setRelatedPosts(recentPosts);
    }
  }, [recentPosts, similarPosts, slug]);

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {slug ? "Related Posts" : "Recent Posts"}
        </h3>
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts?.length === 0 ? (
        <div>No data!</div>
      ) : (
        relatedPosts?.map((post) => {
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
        })
      )}
    </div>
  );
}
