import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth/session";
import { headers } from "next/headers";

interface Props {
  searchParams: Promise<{
    to: string;
    type: "verification" | "password" | "email";
  }>;
}

const mailDescription = {
  verification: "We've sent a verification link to confirm your email.",
  password: "We've sent you a link to reset your password.",
  email: "We've sent you a link to update your email address.",
  none: "We've need to confirm that its you."
};

export default async function MailSentPage({ searchParams }: Props) {
  const { to, type = "verification" } = await searchParams;

  const user = await getAuthUser(await headers());

  // Only redirect for verification emails
  if (type === "verification" && user?.emailVerified) {
    redirect("/dashboard");
  }

  const description = mailDescription[type];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-10 animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card with entrance animation */}
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-xl transform animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <CardHeader className="text-center space-y-6 pb-8">
            {/* Animated icon */}
            <div className="relative mx-auto">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-xl">
                <Mail className="w-10 h-10 text-white animate-in zoom-in-50 duration-500 delay-200" />
              </div>
            </div>

            <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Check Your Inbox
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                {description} {/* Description */}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Email Display */}
            <div className="relative bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4 border-l-4 border-blue-500/30 transform transition-all duration-300 hover:shadow-md animate-in fade-in-0 slide-in-from-left-2 delay-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Sent to
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-foreground text-lg break-all">
                  {to} {/*Email*/}
                </p>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Help Section */}
            <div className="pt-6 border-t border-border/50 animate-in fade-in-0 duration-500 delay-700">
              <div className="text-center space-y-4">
                <p className="text-sm font-medium text-foreground">
                  Please check your inbox and follow the instructions in the
                  email.
                </p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">
                  Don&apos;t see the email? Check your spam folder or contact
                  support if you need help.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-20 animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
