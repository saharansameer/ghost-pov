import { ExpandableField } from "@/components/client";

interface EchoDetailsProps {
  title: string,
  description: string | null | undefined
}

export function EchoDetails({ title, description }: EchoDetailsProps) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          {title}
        </h1>
        {description && (
          <div className="text-base text-muted-foreground max-w-2xl border-t-1 rounded-md">
            <ExpandableField text={description} />
          </div>
        )}
      </div>
    </div>
  );
}
