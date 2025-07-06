"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, Badge } from "@/components/ui";
import { getFormatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface ExpandableMarkdownFieldProps {
  content: string;
  createdAt: Date;
  maxLines?: number;
  showMoreText?: string;
  showLessText?: string;
}

export function ExpandableMarkdownField({
  content,
  createdAt,
  maxLines = 4,
  showMoreText = "show more",
  showLessText = "show less",
}: ExpandableMarkdownFieldProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isClamped, setIsClamped] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Determine if content exceeds maxLines when collapsed
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * maxLines;

    const checkClamp = () => {
      // Only clamp if not expanded
      if (!isExpanded) {
        setIsClamped(el.scrollHeight > maxHeight + 1);
      }
    };

    // Initial check on mount and children changes
    checkClamp();

    // Re-check on window resize for responsive layouts
    window.addEventListener("resize", checkClamp);
    return () => window.removeEventListener("resize", checkClamp);
  }, [content, contentRef, isExpanded, maxLines]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="relative rounded-sm px-2 py-1 border-t">
      <div
        ref={contentRef}
        className="leading-normal transition-[max-height] duration-300 
        ease-in-out overflow-hidden"
        style={
          isExpanded
            ? { maxHeight: contentRef.current?.scrollHeight }
            : { maxHeight: `${maxLines * 1.5}em` }
        }
      >
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {/* Date and Time */}
          <div className="relative pb-7">
            <Badge
              variant={"secondary"}
              className="absolute left-0 flex items-center justify-start gap-2 text-muted-foreground"
            >
              <Calendar size={16} />
              <span className="text-sm">
                {getFormatDate(createdAt, "date-time")}
              </span>
            </Badge>
          </div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="scroll-m-20 text-lg font-semibold tracking-tight"
                  {...props}
                />
              ),
              h4: ({ ...props }) => (
                <h4
                  className="scroll-m-20 text-base font-semibold tracking-tight"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className="text-base leading-relaxed mb-4 text-gray-800 dark:text-gray-300"
                  {...props}
                />
              ),
              li: ({ ...props }) => (
                <li className="ml-6 list-disc mb-2" {...props} />
              ),
              code: ({ children, ...props }) => (
                <code
                  className="bg-gray-100 px-1 rounded text-sm text-orange-400"
                  {...props}
                >
                  {children}
                </code>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {isClamped && (
        <>
          {!isExpanded && (
            <div
              className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-accent dark:from-accent/40 
            to-transparent pointer-events-none rounded-b-sm"
            />
          )}
          <Button
            variant="link"
            onClick={toggleExpand}
            className="absolute bottom-0 translate-y-6 p-0 left-2"
          >
            {isExpanded ? showLessText : showMoreText}
          </Button>
        </>
      )}
    </div>
  );
}
