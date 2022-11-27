import React from "react";

import Link from "next/link";
import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";

import { getCategories } from "../services/getCategories";

export default function Header() {
  const { data: categories } = useSWR("categories", getCategories);
  const { status, data } = useSession();

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              HyperCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories?.map((category) => {
            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="md:float-right mt-2 align-middle md:mr-9">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="relative font-semibold text-white before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-white before:transition hover:before:scale-x-100"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/signup">
                <a className="relative font-semibold text-white before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-white before:transition hover:before:scale-x-100">
                  Sign Up
                </a>
              </Link>
              <button
                onClick={() => signIn()}
                className="relative font-semibold text-white before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-white before:transition hover:before:scale-x-100 ml-4"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
