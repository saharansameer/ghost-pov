import {
  Shield,
  Eye,
  Users,
  Lock,
  Globe,
  CheckCircle,
  Cookie,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GhostPOV",
  description: "Read how GhostPOV collects, uses, and protects your data.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              How we collect, use, and protect your information
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
          {/* Privacy Commitment */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Our Privacy Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GhostPOV is built with privacy at its core. We collect minimal
                data, never sell your information, and do not use invasive
                tracking or advertising technologies.
              </p>
              <p className="text-muted-foreground">
                We may use privacy-focused analytics provided by our hosting
                platform (Vercel) to monitor traffic and improve performance.
                These do not collect personal or advertising-related data.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-muted-foreground" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Account Information</h4>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>• Email address (required for all sign-up methods)</li>
                  <li>• Name and profile image (for Google/GitHub OAuth)</li>
                  <li>
                    • Password (for email sign-up, encrypted and stored
                    securely)
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Usage Data</h4>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>• Echo posts you create and their content</li>
                  <li>• Anonymous feedback received on your posts</li>
                  <li>• AI-generated insights and summaries you request</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-muted-foreground" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use your information solely to:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-4">
                <li>• Provide and maintain the GhostPOV service</li>
                <li>• Authenticate your account and secure your data</li>
                <li>• Generate AI-powered insights and summaries</li>
                <li>• Process payments through Razorpay</li>
                <li>• Provide spam and abuse filtering for premium users</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security & Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-muted-foreground" />
                Data Security & Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your data is stored securely using cloud-based infrastructure
                provided by{" "}
                <Link
                  href={
                    "https://www.mongodb.com/products/platform/atlas-database"
                  }
                  className="p-link"
                >
                  MongoDB
                </Link>
                . We rely on industry-standard security measures and practices
                to ensure your information is protected.
              </p>
              <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-900 dark:text-green-100">
                      No Payment Data Storage
                    </span>
                  </div>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    We don&apos;t store any payment information. All
                    transactions are securely processed by Razorpay.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Your Rights & Data Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-muted-foreground" />
                Your Rights & Data Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You have control over your data:
              </p>
              <ul className="text-muted-foreground space-y-2 ml-4">
                <li>• Access all your stored data at any time</li>
                <li>• Delete your account and all associated data</li>
                <li>
                  • Modify your email address (only for email-based sign-ups)
                </li>
                <li>• Request a copy of your data by contacting us</li>
              </ul>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent>
                  <p className="text-destructive text-sm">
                    <strong>Account Deletion:</strong> When you delete your
                    account, all your data including echo posts, received
                    feedback, and AI summaries are permanently removed from our
                    database and servers.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-muted-foreground" />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We integrate with the following trusted services:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent>
                    <h4 className="font-semibold mb-3">Authentication</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Google OAuth</li>
                      <li>• GitHub OAuth</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent>
                    <h4 className="font-semibold mb-3">Payments</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Razorpay</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-muted-foreground" />
                Cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We use essential cookies to manage authentication and maintain
                user sessions. These cookies are necessary for the core
                functionality of the service and cannot be disabled. We do not
                use cookies for tracking, advertising, or analytics purposes.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p className="text-muted-foreground text-sm">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
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
