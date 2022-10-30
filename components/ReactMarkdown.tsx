import Link from "next/link";
import ReactMarkdownCmp from "react-markdown";

interface ComponentProps {
  children: string;
}

export default function ReactMarkdown({ children }: ComponentProps) {
  return (
    <article className="prose lg:prose-lg">
      <ReactMarkdownCmp
        components={{
          a: ({ href, ...props }) => {
            if (!href) {
              return <a {...props} />;
            }
            return (
              <Link href={href}>
                <a {...props} />
              </Link>
            );
          },
        }}
      >
        {children}
      </ReactMarkdownCmp>
    </article>
  );
}
