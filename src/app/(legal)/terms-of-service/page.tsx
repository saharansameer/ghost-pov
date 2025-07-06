import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentFullYear } from "@/lib/utils";

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
        <div className="max-w-4xl mx-auto px-6 pt-7">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              Your agreement with GhostPOV
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
          {/* Introduction */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              1. Introduction
            </h2>

            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Welcome to GhostPOV (&ldquo;Ghost Pov&rdquo;, &ldquo;we&rdquo;,
                &ldquo;our&rdquo;, or &ldquo;us&rdquo;). These Terms of Service
                (&ldquo;Terms&rdquo;, &ldquo;Terms &amp; Conditions&rdquo;,
                &ldquo;TnC&rdquo;, &ldquo;T&amp;C&rdquo;) constitute a legally
                binding agreement between you and GhostPOV regarding your use of
                our website, platform, and any related services or features we
                provide.
              </p>
              <p>
                Our{" "}
                <Link href="/privacy-policy" className="p-link">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/payments-policy" className="p-link">
                  Payments Policy
                </Link>{" "}
                are incorporated by reference and form an integral part of this
                agreement.
              </p>
              <p>
                By accessing, browsing, or using GhostPOV in any manner, you
                acknowledge that you have read, understood, and agree to be
                bound by these Terms. If you do not agree to these Terms, you
                must not use our service.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              2. Service Description
            </h2>

            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                GhostPOV is an anonymous feedback platform that enables users to
                create &ldquo;echo&rdquo; posts and receive anonymous feedback
                from the community. Our service facilitates honest, constructive
                communication while maintaining user privacy.
              </p>
              <p>
                <strong className="text-foreground">Core Features:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Creation and sharing of echo posts</li>
                <li>Anonymous feedback submission and reception</li>
                <li>Content moderation and filtering systems</li>
                <li>User dashboard and analytics</li>
              </ul>
              <p>
                <strong className="text-foreground">Premium Features:</strong>
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>AI-powered insights and sentiment analysis</li>
                <li>Advanced spam and abuse detection</li>
                <li>Enhanced content filtering and customization</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              3. User Responsibilities and Acceptable Use
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  3.1 Permitted Use
                </h3>
                <p>
                  You agree to use GhostPOV only for lawful purposes and in
                  accordance with these Terms. You are responsible for:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>
                    Maintaining the confidentiality of your account information
                  </li>
                  <li>
                    Using the service in a respectful and constructive manner
                  </li>
                  <li>Providing accurate information when required</li>
                  <li>Respecting the privacy and anonymity of other users</li>
                  <li>Complying with all applicable laws and regulations</li>
                </ul>
              </div>

              <div className="bg-destructive/10 border-l-4 border-destructive p-6 rounded-r-lg">
                <h3 className="text-lg font-medium text-destructive mb-3">
                  3.2 Prohibited Activities
                </h3>
                <p className="text-destructive mb-3">
                  You expressly agree NOT to:
                </p>
                <ul className="space-y-2 ml-6 text-destructive list-disc">
                  <li>
                    Engage in harassment, bullying, or threatening behavior
                  </li>
                  <li>Share illegal, defamatory, or harmful content</li>
                  <li>Attempt to identify anonymous feedback providers</li>
                  <li>
                    Use automated tools, bots, or scripts to access the service
                  </li>
                  <li>Create multiple accounts to circumvent limitations</li>
                  <li>Distribute malware, viruses, or malicious links</li>
                  <li>Violate intellectual property rights</li>
                  <li>
                    Engage in any activity that disrupts or interferes with the
                    service
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              4. Privacy and Data Protection
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Your privacy is important to us. Our collection, use, and
                protection of your personal information is governed by our
                Privacy Policy, which is incorporated into these Terms by
                reference.
              </p>
              <p>
                While we maintain anonymity for feedback providers, we may
                collect certain information necessary for service operation,
                security, and legal compliance. You consent to such collection
                and use as described in our Privacy Policy.
              </p>
              <p>
                You are responsible for the content you post and the feedback
                you provide. Do not share personal information that could
                compromise your anonymity or that of others.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              5. Limitation of Liability and Disclaimers
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div>
                    <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                      Important Risk Acknowledgment
                    </h4>
                    <p className="text-orange-600 dark:text-orange-400">
                      Due to the anonymous nature of our service, feedback
                      content or message may contain spam, abusive language,
                      slurs, or malicious links. Exercise caution and avoid
                      interacting with suspicious content.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  5.1 Service Disclaimer
                </h3>
                <p>
                  GhostPOV is provided on an &ldquo;as is&rdquo; and &ldquo;as
                  available&rdquo; basis. We make no warranties, expressed or
                  implied, regarding the service&rsquo;s reliability, accuracy,
                  or fitness for any particular purpose.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  5.2 Limitation of Liability
                </h3>
                <p>
                  To the maximum extent permitted by law, GhostPOV and its team
                  (&ldquo;owners&rdquo; or &ldquo;developers&rdquo;) shall not
                  be liable for:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>
                    Any damages resulting from feedback content received through
                    the platform
                  </li>
                  <li>
                    Losses arising from malicious links or content shared by
                    users
                  </li>
                  <li>Service interruptions, downtime, or data loss</li>
                  <li>Actions or misconduct of other users</li>
                  <li>
                    Any indirect, incidental, special, or consequential damages
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  5.3 Indemnification
                </h3>
                <p>
                  You agree to indemnify and hold harmless GhostPOV, its
                  officers, directors, employees, and agents from any claims,
                  damages, or expenses arising from your use of the service or
                  violation of these Terms.
                </p>
              </div>
            </div>
          </section>

          {/* Premium Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              6. Premium Features and Billing
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  6.1 Premium Subscriptions
                </h3>
                <p>
                  Premium features are available through subscription plans with
                  enhanced functionality including AI-powered insights, advanced
                  filtering, and priority support.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  6.2 Billing and Payments
                </h3>
                <p>
                  Subscription fees are billed in advance and are non-refundable
                  except as required by law. Detailed payment terms are outlined
                  in our Payments Policy.
                </p>
              </div>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 className="text-lg font-medium text-primary mb-3">
                  6.3 Marketing Terms Clarification
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

          {/* Service Availability */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              7. Service Availability and Modifications
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                We strive to maintain continuous service availability but cannot
                guarantee uninterrupted access. We may temporarily suspend the
                service for maintenance, updates, or security reasons.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any
                aspect of the service at any time. We will provide reasonable
                notice of significant changes when possible.
              </p>
              <p>
                These Terms may be updated periodically. Continued use of the
                service after changes constitutes acceptance of the updated
                Terms.
              </p>
            </div>
          </section>

          {/* Account Termination */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              8. Account Termination
            </h2>
            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  8.1 Termination by User
                </h3>
                <p>
                  You may terminate your account at any time by following the
                  account deletion process in your user settings. Upon
                  termination, your access to premium features will cease
                  immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  8.2 Termination by GhostPOV
                </h3>
                <p>
                  We reserve the right to terminate or suspend accounts for:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>Violation of these Terms of Service</li>
                  <li>Abusive behavior toward other users or staff</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Repeated policy violations</li>
                  <li>Failure to pay subscription fees</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  8.3 Effect of Termination
                </h3>
                <p>
                  Upon termination, your right to use the service ceases
                  immediately. We may retain certain information as required by
                  law or for legitimate business purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              9. Governing Law and Dispute Resolution
            </h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                These Terms are governed by and construed in accordance with the
                laws of India, without regard to conflict of law principles.
              </p>
              <p>
                Any disputes arising from or relating to these Terms or your use
                of GhostPOV shall be subject to the exclusive jurisdiction of
                the courts located in India.
              </p>
              <p>
                We encourage users to contact us directly to resolve any issues
                before pursuing legal action.
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
                <strong className="text-foreground">Severability:</strong> If
                any provision of these Terms is found to be unenforceable, the
                remaining provisions will continue in full force and effect.
              </p>
              <p>
                <strong className="text-foreground">Entire Agreement:</strong>{" "}
                These Terms, together with our{" "}
                <Link href="/privacy-policy" className="p-link">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/payments-policy" className="p-link">
                  Payments Policy
                </Link>
                , constitute the entire agreement between you and GhostPOV.
              </p>
              <p>
                <strong className="text-foreground">No Waiver:</strong> Our
                failure to enforce any provision of these Terms shall not be
                deemed a waiver of such provision or our right to enforce it.
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
                If you have questions about these Terms of Service, need
                clarification on any provisions, or wish to report a violation,
                please contact us at:{" "}
                <Link href="mailto:privacy@ghostpov.xyz" className="email-text">
                  privacy@ghostpov.xyz
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
        <p className="text-sm text-muted-foreground">
          &copy; {getCurrentFullYear()} GhostPOV. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
