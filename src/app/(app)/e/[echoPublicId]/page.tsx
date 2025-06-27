import { FeedbackForm, ExpandableField } from "@/components/client";

interface EchoFeedbackProps {
  params: Promise<{ echoPublicId: string }>;
}

export default async function EchoFeedbackPage({ params }: EchoFeedbackProps) {
  const { echoPublicId } = await params;

  const response = await fetch(
    `${process.env.APP_URL}/api/echo/${echoPublicId}`,
    {
      method: "GET",
      next: { revalidate: 10 },
    }
  );

  const { data } = await response.json();

  return (
    <div className="min-h-screen bg-background">
      <div className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                {data.title}
              </h1>
              {data.description && (
                <div className="text-base text-muted-foreground max-w-2xl border-t-1 rounded-md">
                  <ExpandableField text={data.description} />
                </div>
              )}
            </div>
          </div>

          {/* Subtle divider */}
          <div className="w-full max-w-xl h-px my-10 bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />

          {/* Feedback Section */}
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Leave Your Feedback
                </h2>
                <p className="text-muted-foreground max-w-lg">
                  Completely anonymous. Your identity is never recorded.
                </p>
              </div>

              <FeedbackForm echoPublicId={echoPublicId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
