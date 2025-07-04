import React from "react";
import {
  Mail,
  CreditCard,
  Shield,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us | GhostPOV",
  description:
    "We're here to help. Choose the most appropriate contact method based on your inquiry type.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactUs() {
  const contactCategories = [
    {
      title: "General Support",
      description: "Technical issues, account help, and general inquiries",
      email: "support@ghostpov.xyz",
      icon: HelpCircle,
      color: "purple",
    },
    {
      title: "Payment Support",
      description:
        "Billing questions, payment issues, and transaction disputes",
      email: "payments@ghostpov.xyz",
      icon: CreditCard,
      color: "emerald",
    },
    {
      title: "Privacy & Legal",
      description:
        "Privacy policy questions, terms of service, and legal matters",
      email: "privacy@ghostpov.xyz",
      icon: Shield,
      color: "blue",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200";
      case "blue":
        return "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200";
      case "purple":
        return "border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-200";
      default:
        return "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Contact Us
            </h1>
            <p className="text-muted-foreground">
              Get in touch with our team for support, questions, or feedback
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* FAQ Reference */}
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Quick answers:</strong>
            <p>
              Many common questions are answered in our{" "}
              <Link href={"faqs"} className="p-link">
                FAQ section
              </Link>
              . Check there first for faster resolution of common issues.
            </p>
          </AlertDescription>
        </Alert>

        {/* Contact Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(category.color)}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="min-h-16">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
                    <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                    <Link
                      href={`mailto:${category.email}`}
                      className="text-sm font-medium hover:underline underline-offset-1"
                    >
                      {category.email}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Before You Contact Us */}
        <Card>
          <CardHeader>
            <CardTitle>Before You Contact Us</CardTitle>
            <CardDescription>
              Help us help you better by providing the following information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">For Technical Issues:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Your account email address</li>
                  <li>• Device and browser information</li>
                  <li>• Steps to reproduce the issue</li>
                  <li>• Screenshots if applicable</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">For Payment Issues:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Transaction ID or receipt</li>
                  <li>• Date and amount of transaction</li>
                  <li>• Payment method used</li>
                  <li>• Description of the issue</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Alert>
          <MessageCircle className="h-4 w-4" />
          <AlertDescription>
            We&apos;re here to help. We typically respond within 24-72 hours
            during business days.
          </AlertDescription>
        </Alert>
      </div>

      <div className="py-10"></div>
    </div>
  );
}
