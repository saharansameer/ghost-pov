import {
  FileText,
  Users,
  AlertTriangle,
  CreditCard,
  Globe,
  XCircle,
  ClipboardPen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | GhostPOV",
  description: "Understand the terms and conditions for using GhostPOV.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Your agreement with GhostPOV
            </p>
            <Badge variant="outline" className="text-sm">
              Last updated: 7 July, 2025
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ClipboardPen className="h-6 w-6 text-muted-foreground" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Welcome to GhostPOV (&ldquo;Ghost Pov&rdquo;, &ldquo;we&rdquo;,
                &ldquo;our&rdquo;, or &ldquo;us&rdquo;). These Terms of Service
                (&ldquo;Terms&rdquo;, &ldquo;Terms & Condition&rdquo;,
                &ldquo;TnC&rdquo;, &ldquo;T&C&rdquo;) govern your use of
                GhostPOV across our website and any services and features we
                offer. Our{" "}
                <Link href={"/privacy-policy"} className="p-link">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href={"/payments-policy"} className="p-link">
                  Payments Policy
                </Link>{" "}
                also form part of your agreement with us.
              </p>
              <p className="text-muted-foreground">
                By using GhostPOV or its services, you agree to these Terms and
                our related policies. These terms apply to all users or visitors
                who access or use the platform.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GhostPOV is an anonymous feedback platform where users can
                create &ldquo;echo&rdquo; posts and receive anonymous feedback
                from others. The service includes:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-4">
                <li>• Creating and sharing echo posts</li>
                <li>• Receiving anonymous feedback</li>
                <li>• AI-powered insights and summaries (premium feature)</li>
                <li>• Spam and abuse filtering (premium feature)</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-muted-foreground" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold">You agree to:</h4>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>• Use the service lawfully and responsibly</li>
                  <li>• Not share malicious, harmful, or illegal content</li>
                  <li>
                    • Not attempt to identify anonymous feedback providers
                  </li>
                  <li>• Respect other&apos;s privacy and dignity</li>
                  <li>• Not use automated tools to spam the service</li>
                </ul>
              </div>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent>
                  <h4 className="font-semibold text-destructive mb-3">
                    Prohibited Activities
                  </h4>
                  <ul className="text-destructive text-sm space-y-1 ml-4">
                    <li>• Harassment, abuse, or threatening behavior</li>
                    <li>• Sharing illegal content or links</li>
                    <li>• Attempting to compromise system security</li>
                    <li>• Creating multiple accounts to circumvent limits</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  <strong>Risk Acknowledgment:</strong> Due to the anonymous
                  nature of our service, feedback content or message may contain
                  spam, abusive language, slurs, or malicious links. Please
                  exercise caution and avoid interacting with suspicious
                  content.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h4 className="font-semibold">
                  GhostPOV and its team (&ldquo;owners&rdquo; or
                  &ldquo;developers&rdquo;) are NOT responsible for:
                </h4>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>
                    • Any damages or losses resulting from feedback received
                  </li>
                  <li>• Content of anonymous feedback messages</li>
                  <li>
                    • Malicious links or content shared through the platform
                  </li>
                  <li>• Any misuse of the service by other users</li>
                  <li>• Service interruptions or data loss</li>
                </ul>
              </div>

              <Card className="bg-muted/30">
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    <strong>No Warranties:</strong> The service is provided
                    &ldquo;as is&rdquo; without any warranties of any kind,
                    either express or implied.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Premium Features & Marketing Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
                Premium Features & Marketing Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Premium Features</h4>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>• AI-powered insights and summaries</li>
                  <li>• Advanced spam and abuse filtering</li>
                  <li>• Add-on summary credits available for purchase</li>
                </ul>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent>
                  <h4 className="font-semibold text-primary mb-3">
                    Marketing Terms Clarification
                  </h4>
                  <div className="text-primary/80 text-sm space-y-3">
                    <p>
                      <strong>&ldquo;Lifetime&rdquo;</strong> means as long as
                      GhostPOV remains active and operational. This is not a
                      guarantee of perpetual service.
                    </p>
                    <p>
                      <strong>&ldquo;Unlimited&rdquo;</strong> features may have
                      reasonable usage limits to ensure fair use and service
                      stability.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-muted-foreground" />
                Service Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We strive to keep GhostPOV available 24/7, but we cannot
                guarantee uninterrupted service. We may temporarily suspend the
                service for maintenance or updates.
              </p>
              <Card className="bg-muted/30">
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    We reserve the right to modify, suspend, or discontinue the
                    service at any time with reasonable notice to users.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Account Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-muted-foreground" />
                Account Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend accounts that
                violate these terms. Users may also delete their accounts at any
                time.
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold">
                  Reasons for account termination:
                </h4>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>• Violation of prohibited activities</li>
                  <li>• Abuse of the service or other users</li>
                  <li>• Fraudulent or illegal activities</li>
                  <li>• Repeated violations of community guidelines</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-muted-foreground" />
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These terms are governed by the laws of India. Any legal
                disputes will be resolved only under the jurisdiction of courts
                in India.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-2">Contact & Disputes</h3>
              <p className="text-muted-foreground text-sm">
                For any questions regarding these terms, please contact us at{" "}
                <Link href="mailto:privacy@ghostpov.xyz" className="email-text">
                  privacy@ghostpov.xyz
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-10"></div>
    </div>
  );
}
