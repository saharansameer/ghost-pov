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
        <div className="max-w-4xl mx-auto px-6 pt-7">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Payments Policy
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              How we handle your payment and billing information
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground border">
              Last updated: July 7, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="max-w-none">
          {/* Overview */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              1. Overview
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                GhostPOV provides a premium service with transparent pricing and
                secure payment processing. This policy explains our payment
                terms, billing procedures, accepted payment methods, and refund
                policies to ensure you understand our financial practices before
                making any purchases.
              </p>
              <p>
                All payments are processed through{" "}
                <Link href={"https://razorpay.com/"} className="p-link">
                  Razorpay
                </Link>
                &rsquo;s secure infrastructure. We do not store any payment
                information on our servers, ensuring your financial data remains
                protected.
              </p>
              <p>
                Our{" "}
                <Link href="/privacy-policy" className="p-link">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-of-service" className="p-link">
                  Terms of Service
                </Link>{" "}
                are incorporated by reference and form an integral part of our
                payment practices.
              </p>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              2. Accepted Payment Methods
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                We accept various payment methods through our secure payment
                processor,{" "}
                <Link href={"https://razorpay.com/"} className="p-link">
                  Razorpay
                </Link>
                , to accommodate different preferences and banking systems:
              </p>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  2.1 Credit &amp; Debit Cards
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Visa credit and debit cards</li>
                  <li>MasterCard credit and debit cards</li>
                  <li>RuPay credit and debit cards</li>
                  <li>All major domestic and international cards</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  2.2 Digital Payment Methods
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>UPI (PhonePe, Google Pay, Paytm, BHIM)</li>
                  <li>Net Banking from all major banks</li>
                  <li>Mobile wallets (Paytm, PhonePe, Amazon Pay)</li>
                  <li>Buy now, pay later services</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing Structure */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              3. Pricing Structure
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  3.1 Premium Plan
                </h3>
                <p>
                  GhostPOV offers a one-time premium purchase that provides
                  lifetime access to all premium features. This one-time payment
                  model ensures you pay once and enjoy premium benefits without
                  recurring charges.
                </p>
                <p className="mt-3">
                  <strong className="text-foreground">
                    Premium features include:
                  </strong>
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>AI-powered content insights and intelligent summaries</li>
                  <li>Advanced spam detection and abuse filtering</li>
                  <li>Priority customer support</li>
                  <li>Enhanced privacy controls</li>
                  <li>Access to beta features and early updates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  3.2 Add-on Services
                </h3>
                <p>
                  Users can purchase additional AI summary credits separately if
                  they exceed their included quota. These credits are available
                  in various packages to suit different usage patterns and
                  requirements.
                </p>
              </div>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 className="text-lg font-medium text-primary mb-3">
                  3.3 Marketing Terms Clarification
                </h3>
                <div className="space-y-3 text-primary">
                  <p>
                    <strong>&ldquo;Lifetime&rdquo; access</strong> means for the
                    duration that GhostPOV remains operational and is not a
                    guarantee of perpetual service availability.
                  </p>
                  <p>
                    <strong>&ldquo;Unlimited&rdquo; features</strong> are
                    subject to fair use policies and reasonable limitations to
                    ensure service stability and prevent abuse.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Security */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              4. Payment Security
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Your payment security is our highest priority. We implement
                industry-standard security measures to protect your financial
                information:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>
                  All payments processed through Razorpay&rsquo;s PCI DSS
                  compliant infrastructure
                </li>
                <li>256-bit SSL encryption for all payment transactions</li>
                <li>
                  We never store, access, or handle your payment credentials
                </li>
                <li>Two-factor authentication support for enhanced security</li>
                <li>Regular security audits and compliance monitoring</li>
                <li>Fraud detection and prevention systems</li>
              </ul>
              <p>
                Razorpay maintains the highest security standards and is trusted
                by millions of businesses across India. Your payment data is
                encrypted and protected throughout the entire transaction
                process.
              </p>
            </div>
          </section>

          {/* Refund Policy */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              5. Refund Policy
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed">
              <div className="bg-destructive/10 border-l-4 border-destructive p-6 rounded-r-lg">
                <h3 className="text-lg font-medium text-destructive mb-3">
                  5.1 No Refunds Policy
                </h3>
                <p className="text-destructive mb-4">
                  <strong>All sales are final.</strong> We do not offer refunds
                  for any purchases made on GhostPOV, including premium plans
                  and add-on credits.
                </p>
                <p className="text-destructive">
                  This policy exists because our premium features provide
                  immediate value and access to AI-powered services that incur
                  costs from the moment they are activated.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  5.2 Before You Purchase
                </h3>
                <p>
                  We strongly encourage you to thoroughly evaluate our service
                  before making any purchase:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>
                    Use our free tier to understand the platform and its
                    capabilities
                  </li>
                  <li>
                    Read our Terms of Service and Privacy Policy carefully
                  </li>
                  <li>
                    Contact our support team if you have any questions or
                    concerns
                  </li>
                  <li>
                    Ensure you understand exactly what features are included in
                    your purchase
                  </li>
                  <li>
                    Verify that our service meets your specific needs and
                    requirements
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Billing and Invoicing */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              6. Billing &amp; Invoicing
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  6.1 Tax Information
                </h3>
                <p>
                  All prices displayed on GhostPOV are inclusive of applicable
                  taxes as per Indian tax regulations. Goods and Services Tax
                  (GST) will be added where applicable and will be clearly shown
                  during the checkout process.
                </p>
                <p>
                  International customers may be subject to additional taxes or
                  duties imposed by their local jurisdictions, which are not
                  included in our pricing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  6.2 Invoice Delivery
                </h3>
                <p>
                  Upon successful payment, you will receive a detailed invoice
                  and payment confirmation via email. This invoice will include:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>Transaction ID and payment details</li>
                  <li>Itemized breakdown of charges</li>
                  <li>Tax information and GST details</li>
                  <li>Company information and registration details</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  6.3 Currency Information
                </h3>
                <p>
                  All prices are displayed in US Dollar (USD), but payments are
                  handled in Indian Rupees (INR). For international customers,
                  your bank or payment provider will handle currency conversion
                  at prevailing exchange rates, which may include additional
                  conversion fees.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Issues */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              7. Payment Issues &amp; Support
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed mt-2">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-2 py-1">
                <div className="flex items-start gap-3">
                  <div>
                    <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                      Common Payment Issues
                    </h4>
                    <p className="text-orange-600 dark:text-orange-400 mb-3">
                      If your payment fails, please check with your bank or
                      payment provider first. Most issues can be resolved
                      quickly by contacting your financial institution.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  7.1 Failed Payments
                </h3>
                <p>Common causes of payment failures include:</p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>Insufficient funds in your account</li>
                  <li>Card or account spending limits exceeded</li>
                  <li>Bank security restrictions or fraud protection</li>
                  <li>Incorrect payment details or expired cards</li>
                  <li>International transaction restrictions</li>
                  <li>Technical issues with payment gateway</li>
                </ul>
                <p className="mt-4">
                  We recommend contacting your bank or payment provider first to
                  resolve any payment issues. You can then retry the transaction
                  once the issue is resolved.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  7.2 Payment Disputes
                </h3>
                <p>
                  For any payment-related issues, billing questions, or
                  disputes, please contact our support team with the following
                  information:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>Your account email address</li>
                  <li>Transaction ID or payment reference</li>
                  <li>Date and amount of the transaction</li>
                  <li>Description of the issue</li>
                  <li>Screenshots or documentation (if applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  7.3 Response Times
                </h3>
                <p>
                  We aim to respond to all payment-related queries within 24-48
                  hours during business days. Complex issues may require
                  additional time for investigation and resolution.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              8. Policy Updates and Changes
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                We may update this Payments Policy from time to time to reflect
                changes in our services, legal requirements, or business
                practices. When we make significant changes, we will:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>
                  Update the &ldquo;Last updated&rdquo; date at the top of this
                  policy
                </li>
                <li>Notify users via email about material changes</li>
                <li>Provide notice through our platform interface</li>
                <li>Maintain transparency about what changes have been made</li>
              </ul>
              <p>
                Continued use of our services after policy updates constitutes
                acceptance of the revised terms.
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              9. Data Protection and Privacy
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Payment-related data collection and processing is governed by
                our Privacy Policy, which is incorporated into this Payments
                Policy by reference.
              </p>
              <p>
                We collect only the minimum necessary information to process
                payments and provide our services. Financial data is processed
                exclusively by our payment processor and is not stored on our
                servers.
              </p>
              <p>
                You have rights regarding your personal data as outlined in our
                Privacy Policy. For payment-specific data inquiries, please
                contact our support team.
              </p>
            </div>
          </section>

          {/* Miscellaneous */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              10. Miscellaneous
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Governing Law:</strong> This
                Payments Policy is governed by the laws of India, and any
                disputes will be subject to the exclusive jurisdiction of Indian
                courts.
              </p>
              <p>
                <strong className="text-foreground">Severability:</strong> If
                any provision of this policy is found to be unenforceable, the
                remaining provisions will continue in full force and effect.
              </p>
              <p>
                <strong className="text-foreground">Integration:</strong> This
                policy works in conjunction with our Terms of Service and
                Privacy Policy to form our complete agreement regarding payments
                and billing.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground m-0">
              11. Contact Information
            </h2>
            <div>
              <p className="text-foreground leading-relaxed">
                For payment-related queries, billing questions, technical
                issues, or general support, please contact us at:{" "}
                <Link
                  href="mailto:payments@ghostpov.com"
                  className="email-text"
                >
                  payments@ghostpov.com
                </Link>
              </p>
              <p className="text-sm text-foreground mt-4">
                We aim to respond to all inquiries within 24-72 hours during
                business days.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Effective Date */}
      <div className="text-center py-10">
        <p className="text-sm text-muted-foreground">
          This Policy is effective as of July 7, 2025.
        </p>
      </div>
    </div>
  );
}
