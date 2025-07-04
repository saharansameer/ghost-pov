import Image from "next/image";

interface OgImageProps {
  url: string;
  src: string;
  alt: string;
}

export default function OgImage({ url, src, alt, ...props }: OgImageProps) {
  return (
    <div className="bg-card border rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="flex-1 bg-muted rounded px-3 py-1 text-sm text-muted-foreground">
            {`ghostpov.xyz${url}`}
          </div>
        </div>
        <div className="text-left space-y-3">
          <Image src={src} alt={alt} {...props} />
        </div>
      </div>
    </div>
  );
}
