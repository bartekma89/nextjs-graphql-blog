import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import type { MarkdownResultType } from "../types/global.types";

interface ComponentProps {
  children: MarkdownResultType;
}

export default function ReactMarkdown({ children }: ComponentProps) {
  return (
    <article className="prose lg:prose-lg">
      <MDXRemote
        {...children}
        components={{
          a: ({ href, ...props }) => {
            if (!href) {
              return <a {...props} />;
            }
            return href.startsWith("/") ? (
              <Link href={href}>
                <a {...props} />
              </Link>
            ) : (
              <a {...props} href={href} rel="noopener noreferrer"></a>
            );
          },
        }}
      />
    </article>
  );
}
