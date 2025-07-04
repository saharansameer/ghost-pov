import {
  CreditCard,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments Policy | GhostPOV",
  description: "Learn about payment terms, billing, and refunds on GhostPOV.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PaymentPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Payments Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              How we handle your payment and billing information
            </p>
            <Badge variant="outline" className="text-sm">
              Last updated: 7 July, 2025
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Secure Payments Alert */}
        <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
          <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <AlertTitle className="text-emerald-800 dark:text-emerald-200">
            Secure Payments
          </AlertTitle>
          <AlertDescription className="text-emerald-700 dark:text-emerald-300">
            <p>
              All payments are processed securely through{" "}
              <Link href={"https://razorpay.com/"} className="p-link">
                Razorpay
              </Link>
              . We don&apos;t store any payment information on our servers.
            </p>
          </AlertDescription>
        </Alert>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
            <CardDescription>
              We accept the following payment methods through Razorpay:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Credit Cards (Visa, MasterCard, RuPay)</li>
                    <li>• Debit Cards (Visa, MasterCard, RuPay)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Digital Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• UPI (PhonePe, Google Pay, Paytm)</li>
                    <li>• Net Banking</li>
                    <li>• Mobile Wallets</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Plans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pricing & Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">One-Time Premium Purchase</h4>
              <p className="text-sm text-muted-foreground mb-3">
                GhostPOV offers a one-time premium purchase that unlocks all
                premium features.
              </p>
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                <AlertTitle className="text-blue-800 dark:text-blue-200 mb-2">
                  Premium Features Include:
                </AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• AI-powered insights and summaries</li>
                    <li>• Advanced spam and abuse filtering</li>
                    <li>• Add-on summary credits available for purchase</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
            <div>
              <h4 className="font-medium mb-2">Add-on Purchases</h4>
              <p className="text-sm text-muted-foreground">
                Additional AI summary credits can be purchased separately for
                users who exceed their included quota.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Payment Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
              <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <AlertTitle className="text-emerald-800 dark:text-emerald-200">
                Your Payment Data is Safe
              </AlertTitle>
              <AlertDescription className="text-emerald-700 dark:text-emerald-300">
                <ul className="text-sm space-y-1 ml-4">
                  <li>
                    • All payments processed through Razorpay&apos;s secure
                    infrastructure
                  </li>
                  <li>• We never store your card, bank, or UPI details</li>
                  <li>• PCI DSS compliant payment processing</li>
                  <li>• 256-bit SSL encryption for all transactions</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Refund Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Refund Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-red-800 dark:text-red-200">
                No Refunds Policy
              </AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300 space-y-2">
                <p>
                  <strong>All sales are final.</strong> We do not offer refunds
                  for any purchases made on GhostPOV, including premium plans
                  and add-on credits.
                </p>
                <p>
                  Please carefully review the features and terms before making
                  any purchase. If you have questions about our service, contact
                  us before purchasing.
                </p>
              </AlertDescription>
            </Alert>
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-200">
                Before You Purchase
              </AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-300">
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Try our free tier to understand the service</li>
                  <li>• Read our Terms of Service and Privacy Policy</li>
                  <li>• Contact support if you have any questions</li>
                  <li>• Ensure you understand what features are included</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Payment Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Payment Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Failed Payments</h4>
              <p className="text-sm text-muted-foreground mb-3">
                If your payment fails, please check with your bank or payment
                provider. Common issues include:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Insufficient funds</li>
                <li>• Card/account limits</li>
                <li>• Bank security restrictions</li>
                <li>• Incorrect payment details</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Payment Disputes</h4>
              <p className="text-sm text-muted-foreground">
                For any payment-related issues or disputes, please contact our
                support team at payments@ghostpov.xyz with your transaction
                details.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tax Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              All prices are inclusive of applicable taxes as per Indian tax
              regulations. GST will be added where applicable.
            </p>
            <Alert>
              <AlertDescription>
                <strong>Invoice:</strong> You will receive a payment
                confirmation and invoice via email after successful payment.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Payment Support */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              For payment-related queries, technical issues, or billing
              questions, contact us at{" "}
              <Link href="mailto:payments@ghostpov.com" className="email-text">
                payments@ghostpov.com
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="py-10"></div>
    </div>
  );
}
