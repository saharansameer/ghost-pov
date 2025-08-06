import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GhostPOV",
  description: "Read how GhostPOV collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div>
        <div className="max-w-4xl mx-auto px-6 pt-7">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              How we collect, use, and protect your information
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
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <h2 className="text-2xl font-semibold text-primary m-0 mb-4">
                Our Commitment to Your Privacy
              </h2>
              <div className="space-y-4 text-primary leading-relaxed">
                <p>
                  GhostPOV is built with privacy as a fundamental principle. We
                  collect only the information necessary to provide our
                  services, never sell your data, and maintain complete
                  transparency about our practices.
                </p>
                <p>
                  We may use privacy-focused analytics provided by our hosting
                  platform (Vercel) to monitor traffic and improve performance.
                  These analytics do not collect personal or advertising-related
                  data.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              1. Information We Collect
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  1.1 Account Information
                </h3>
                <p>
                  When you create an account with GhostPOV, we collect the
                  following information:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>Your email address (required for all sign-up methods)</li>
                  <li>
                    Your name and profile image (when using Google or GitHub
                    OAuth)
                  </li>
                  <li>
                    Your password (for email sign-up only, encrypted and stored
                    securely)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  1.2 Usage Data
                </h3>
                <p>To provide our core services, we store:</p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>Echo posts you create and their content</li>
                  <li>Anonymous feedback received on your posts</li>
                  <li>AI-generated insights and summaries you request</li>
                  <li>Basic usage statistics to improve our service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  1.3 Technical Information
                </h3>
                <p>
                  We automatically collect certain technical information when
                  you use our service:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>IP address and general location information</li>
                  <li>Browser type and version</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and features used</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              2. How We Use Your Information
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>We use your information solely for the following purposes:</p>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  2.1 Service Provision
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Provide and maintain the GhostPOV platform</li>
                  <li>Process and deliver anonymous feedback</li>
                  <li>Generate AI-powered insights and summaries</li>
                  <li>Manage your account and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  2.2 Security and Authentication
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Authenticate your identity and secure your account</li>
                  <li>Prevent fraud and abuse</li>
                  <li>Provide spam and abuse filtering for premium users</li>
                  <li>Monitor for suspicious activities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  2.3 Payment Processing
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>
                    Process payments through our trusted partner{" "}
                    <Link href={"https://razorpay.com/"} className="p-link">
                      Razorpay
                    </Link>
                  </li>
                  <li>Manage subscription status and billing</li>
                  <li>Send payment confirmations and receipts</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  2.4 Service Improvement
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Develop new features and functionality</li>
                  <li>Ensure optimal performance and reliability</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Storage and Security */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              3. Data Storage and Security
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  3.1 Data Storage
                </h3>
                <p>
                  Your data is stored securely using industry-standard cloud
                  infrastructure provided by{" "}
                  <Link
                    href="https://www.mongodb.com/products/platform/atlas-database"
                    className="p-link"
                  >
                    MongoDB Atlas
                  </Link>
                  . We rely on industry-standard security measures and practices
                  to ensure your information is protected.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  3.2 Security Measures
                </h3>
                <p>
                  We implement comprehensive security measures to protect your
                  information:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>
                    Secure password hashing using industry-standard algorithms
                  </li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Multi-factor authentication for administrative access</li>
                  <li>Automated backup and disaster recovery systems</li>
                </ul>
              </div>

              <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mb-3">
                  3.3 Payment Security
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  We do not store any payment card information on our servers.
                  All payment transactions are securely processed by{" "}
                  <Link href={"https://razorpay.com/"} className="p-link">
                    Razorpay
                  </Link>
                  , which is PCI DSS compliant and maintains the highest
                  standards of payment security.
                </p>
              </div>
            </div>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              4. Data Sharing and Disclosure
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  4.1 Third-Party Services
                </h3>
                <p>
                  We integrate with the following trusted third-party services:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>
                    <strong>Google OAuth:</strong> For authentication (email,
                    name, profile image)
                  </li>
                  <li>
                    <strong>GitHub OAuth:</strong> For authentication (email,
                    name, profile image)
                  </li>
                  <li>
                    <strong>Razorpay:</strong> For payment processing
                  </li>
                  <li>
                    <strong>Vercel:</strong> For hosting and analytics
                  </li>
                  <li>
                    <strong>MongoDB Atlas:</strong> For secure data storage
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  4.2 Data Sharing Policy
                </h3>
                <p>
                  We do not sell, rent, or share your personal information with
                  third parties for marketing purposes. We may share your
                  information only in the following circumstances:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  4.3 International Transfers
                </h3>
                <p>
                  We use secure cloud services like{" "}
                  <Link
                    href={
                      "https://www.mongodb.com/products/platform/atlas-database"
                    }
                    className="p-link"
                  >
                    MongoDB
                  </Link>{" "}
                  Atlas to store your data. These servers might be located in
                  different countries — not just your own. That means your
                  information may be transferred and stored outside your home
                  country.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights and Control */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              5. Your Rights and Data Control
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  5.1 Access and Portability
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>
                    View all your stored data through your account dashboard
                  </li>
                  <li>Request a complete copy of your data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  5.2 Modification and Deletion
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Delete your account at any time</li>
                  <li>Delete individual echo posts and associated data</li>
                  <li>Modify your email address (for email-based accounts)</li>
                  <li>Change your password and security settings</li>
                </ul>
              </div>

              <div className="bg-destructive/10 border-l-4 border-destructive p-6 rounded-r-lg">
                <h3 className="text-lg font-medium text-destructive mb-3">
                  5.3 Account Deletion
                </h3>
                <p className="text-destructive">
                  When you delete your account, all your data including echo
                  posts, received feedback, AI summaries, and account
                  information are permanently removed from our database and
                  servers. This action is irreversible.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              6. Cookies and Tracking
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  6.1 Essential Cookies
                </h3>
                <p>
                  We use only essential cookies that are necessary for the core
                  functionality of our service:
                </p>
                <ul className="space-y-2 ml-6 mt-3 list-disc">
                  <li>Authentication cookies to maintain your login session</li>
                  <li>Security cookies to prevent unauthorized access</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  6.2 No Tracking Policy
                </h3>
                <p>
                  We do not use cookies for tracking, advertising, or behavioral
                  analysis. We do not implement third-party tracking scripts or
                  pixels that could compromise your privacy.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              7. Data Retention
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  7.1 Retention Periods
                </h3>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Account data: Retained while your account is active</li>
                  <li>
                    Echo posts and feedback: Retained until you delete them or
                    your account
                  </li>
                  <li>
                    Payment records: Retained for 7 years for tax and legal
                    compliance
                  </li>
                  <li>
                    Technical logs: Retained for 90 days for security and
                    debugging
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">
                  7.2 Automatic Deletion
                </h3>
                <p>
                  Inactive accounts (no login for 2 years) will be automatically
                  deleted after email notification. You can reactivate your
                  account by logging in within 30 days of the notification.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              8. Changes to This Policy
            </h2>

            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, or legal requirements. We
                will:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Notify you of any material changes via email</li>
                <li>
                  Update the &ldquo;Last updated&rdquo; date at the top of this
                  policy
                </li>
                <li>Post changes prominently on our website</li>
                <li>
                  Provide at least 30 days notice before significant changes
                  take effect
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground m-0">
              9. Contact Us
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                If you have any questions about this Privacy Policy, your data,
                or our privacy practices, please contact us at:{" "}
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
      </div>
    </div>
  );
}
