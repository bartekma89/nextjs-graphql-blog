/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query GetAllPosts {\n  postsConnection {\n    edges {\n      node {\n        author {\n          bio\n          name\n          id\n          photo {\n            url\n          }\n        }\n        createdAt\n        slug\n        title\n        excerpt\n        featuredImage {\n          url\n        }\n        categhories {\n          name\n          slug\n        }\n      }\n    }\n  }\n}\n\nquery GetRecentedPosts {\n  posts(orderBy: createdAt_ASC, last: 3) {\n    title\n    featuredImage {\n      url\n    }\n    createdAt\n    slug\n  }\n}\n\nquery GetSimilarPosts($slug: String!, $categories: [String!]) {\n  posts(where: {slug_not: $slug, AND: {categhories_some: {slug_in: $categories}}}) {\n    title\n    featuredImage {\n      url\n    }\n    createdAt\n    slug\n  }\n}": types.GetAllPostsDocument,
};

export function graphql(source: "query GetAllPosts {\n  postsConnection {\n    edges {\n      node {\n        author {\n          bio\n          name\n          id\n          photo {\n            url\n          }\n        }\n        createdAt\n        slug\n        title\n        excerpt\n        featuredImage {\n          url\n        }\n        categhories {\n          name\n          slug\n        }\n      }\n    }\n  }\n}\n\nquery GetRecentedPosts {\n  posts(orderBy: createdAt_ASC, last: 3) {\n    title\n    featuredImage {\n      url\n    }\n    createdAt\n    slug\n  }\n}\n\nquery GetSimilarPosts($slug: String!, $categories: [String!]) {\n  posts(where: {slug_not: $slug, AND: {categhories_some: {slug_in: $categories}}}) {\n    title\n    featuredImage {\n      url\n    }\n    createdAt\n    slug\n  }\n}"): (typeof documents)["query GetAllPosts {\n  postsConnection {\n    edges {\n      node {\n        author {\n          bio\n          name\n          id\n          photo {\n            url\n          }\n        }\n        createdAt\n        slug\n        title\n        excerpt\n        featuredImage {\n          url\n        }\n        categhories {\n          name\n          slug\n        }\n      }\n    }\n  }\n}\n\nquery GetRecentedPosts {\n  posts(orderBy: createdAt_ASC, last: 3) {\n    title\n    featuredImage {\n      url\n    }\n    createdAt\n    slug\n  }\n}\n\nquery GetSimilarPosts($slug: String!, $categories: [String!]) {\n  posts(where: {slug_not: $slug, AND: {categhories_some: {slug_in: $categories}}}) {\n    title\n    featuredImage {\n      url\n    }\n    createdAt\n    slug\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;