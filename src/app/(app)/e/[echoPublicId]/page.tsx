import { FeedbackForm } from "@/components/client";
import { EchoDetails } from "@/components/server";

interface PageProps {
  params: Promise<{ echoPublicId?: string }>;
}

async function PublicEcho({ params }: PageProps) {
  const { echoPublicId } = await params;
  const response = await fetch(
    `${process.env.BASE_URL}/api/echo/${echoPublicId}`,
    {
      method: "GET",
      next: { revalidate: 0 },
    }
  );

  const { success, data } = await response.json();

  if (!success) {
    return <div>Echo no longer accepting feedback</div>;
  }

  return <EchoDetails title={data.title} description={data.description} />;
}

export default function Page({ ...props }: PageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <PublicEcho {...props} />

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

              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
