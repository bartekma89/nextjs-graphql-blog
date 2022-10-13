import React from "react";

interface ComponentProps {
  post: { title: string; excerpt: string };
}

export default function PostCard({ post }: ComponentProps) {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
}
