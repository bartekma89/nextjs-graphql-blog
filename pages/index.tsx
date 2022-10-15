import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { GetAllPostsQuery } from "../generated-graphql/graphql";
import { apolloClient } from "../graphql/apolloClient";
import { GetAllPostsDocument } from "../services/getAllPosts";

const PostsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => {
            return (
              <PostCard
                post={{
                  title: post.node.title,
                  excerpt: post.node.excerpt,
                  image: post.node.featuredImage.url,
                  slug: post.node.slug,
                  author: {
                    bio: post.node.author?.bio,
                    name: post.node.author?.name,
                  },
                  createdAt: post.node.createdAt,
                }}
                key={post.node.slug}
              />
            );
          })}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8 ">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetAllPostsQuery>({
    query: GetAllPostsDocument,
  });

  if (!data) {
    return {
      props: {
        posts: [],
      },
      notFound: true,
    };
  }

  return {
    props: {
      posts: data.postsConnection.edges,
    },
  };
};
