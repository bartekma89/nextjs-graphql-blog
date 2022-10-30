import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type InfererGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export type MarkdownResultType = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, string>
>;
