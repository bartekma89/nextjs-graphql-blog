import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { GetCategoriesQuery } from "../generated-graphql/graphql";
import { getCategories } from "../services/getCategories";

export default function Categories() {
  const { data } = useSWR("categories", getCategories);

  const [categories, setCategories] = useState<
    GetCategoriesQuery["categories"]
  >([]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  console.log(categories);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category) => {
        return (
          <Link key={`${category.slug}`} href={`/category/${category.slug}`}>
            <span className="cursor-pointer block pb-3 mb-3">
              {category.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
