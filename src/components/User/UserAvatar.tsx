import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src: string | undefined;
  altText: string;
  className?: string;
  scale?: boolean;
}

export function UserAvatar({
  src,
  altText,
  className = "border-[1px] w-16 h-16",
  scale,
}: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={src}
        alt={`${altText}`}
        className="bg-[#141414]"
      />
      <AvatarFallback
        className={scale ? "scale-200 font-semibold" : "font-semibold"}
      >
        {altText.split("")[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
