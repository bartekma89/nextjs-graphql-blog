import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

import {
  PostDetail,
  Author,
  Comments,
  CommentsForm,
  Categories,
  PostWidget,
} from "../../components";
import { GetPostDetailsQuery } from "../../generated-graphql/graphql";
import { getPostDetails } from "../../services";
import { getAllPost } from "../../services/getAllPosts";
import { InfererGetStaticPathsType } from "../../types/global.types";

export default function PostDetailsPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail
            post={{
              title: post.title,
              imageUrl: post.featuredImage.url,
              author: post.author!.name,
              createdAt: post.createdAt,
              description: post.content.markdown,
            }}
          />
          <Author />
          <CommentsForm />
          <Comments />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPost();

  const paths = posts.map(({ node: { slug } }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: InfererGetStaticPathsType<typeof getStaticPaths>) {
  if (!params?.slug) {
    return {
      props: {},
      notFound: true,
    };
  }

  const data = await getPostDetails(params?.slug);

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      post: data,
    },
  };
}
