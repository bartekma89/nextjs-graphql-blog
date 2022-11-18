import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { getCategories } from "../../services/getCategories";
import { getCategoryPost } from "../../services/getCategoryPost";
import { InfererGetStaticPathsType } from "../../types/global.types";
import { Categories, PostCard } from "../../components";

export default function CategoryPost({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.edges.map((post) => {
            const {
              title,
              excerpt,
              featuredImage: { url },
              slug,
              createdAt,
              author,
            } = post.node;
            return (
              <PostCard
                key={post.node.author?.id}
                post={{
                  title,
                  excerpt,
                  image: url,
                  slug,
                  createdAt,
                  author: { bio: author?.bio, name: author?.name },
                }}
              />
            );
          })}
        </div>
        <div className="col-span1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const categories = await getCategories();

  const paths = categories.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: true,
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

  const posts = await getCategoryPost(params.slug);

  return {
    props: {
      posts,
    },
  };
}
