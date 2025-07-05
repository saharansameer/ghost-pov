"use client";

import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownProps {
  markdownString: string;
}

export function Markdown({ markdownString }: MarkdownProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
        {markdownString}
      </ReactMarkdown>
    </div>
  );
}
