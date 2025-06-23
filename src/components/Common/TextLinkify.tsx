import Linkify from "linkify-react";
import Link from "next/link";

export function TextLinkify({ text }: { text: string }) {
  const options = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: ({ attributes, content }: any) => (
      <Link
        href={attributes.href}
        rel="noopener noreferrer"
        className="underline text-[#3578ff]"
      >
        {content}
      </Link>
    ),
  };

  return <Linkify options={options}>{text}</Linkify>;
}
