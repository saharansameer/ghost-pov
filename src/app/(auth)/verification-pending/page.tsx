import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/session";
import { headers } from "next/headers";

interface Props {
  searchParams: Promise<{ email: string }>;
}

export default async function VerificationPendingPage({ searchParams }: Props) {
  const { email } = await searchParams;

  const user = await getAuthUser(await headers());

  if (user?.emailVerified) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <Card className="shadow-lg border bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            {/* Icon with animation */}
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Check Your Inbox
              </CardTitle>
              <CardDescription className="text-base">
                We&apos;ve sent a verification link to your email address
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email Display */}
            <div className="bg-muted rounded-lg p-2 border-l-4 border-primary">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Sent to:
                </span>
              </div>
              <p className="font-semibold text-foreground break-all line-clamp-1">{email}</p>
            </div>

            {/* Status Steps */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-spin">
                  <Clock className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Waiting for verification
                </span>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Check your spam folder if you don&apos;t see the email.
                <br />
                The verification link will expire in 24 hours.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
