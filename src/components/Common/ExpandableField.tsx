"use client";

import React from "react";
import { Button } from "@/components/ui";
import { TextLinkify } from "@/components/server";

interface ExpandableFieldProps {
  text: string;
  maxLines?: number;
  showMoreText?: string;
  showLessText?: string;
}

export function ExpandableField({
  text,
  maxLines = 3,
  showMoreText = "show more",
  showLessText = "show less",
}: ExpandableFieldProps) {
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
  }, [text, contentRef, isExpanded, maxLines]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="relative rounded-sm px-2 py-1">
      <div
        ref={contentRef}
        className="leading-normal transition-[max-height] duration-300 
        ease-in-out overflow-hidden whitespace-pre-line"
        style={
          isExpanded
            ? { maxHeight: contentRef.current?.scrollHeight }
            : { maxHeight: `${maxLines * 1.5}em` }
        }
      >
        <TextLinkify text={text} />
      </div>

      {isClamped && (
        <>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-accent dark:from-accent/40 
            to-transparent pointer-events-none rounded-b-sm" />
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
