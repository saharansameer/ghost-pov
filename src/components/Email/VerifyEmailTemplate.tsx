import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailTemplateProps {
  email: string;
  url: string;
}

// Template
export function VerifyEmailTemplate({ email, url }: VerifyEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for GhostPOV</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={logo}>GhostPOV</Heading>
          </Section>

          <Section style={content}>
            <Heading style={heading}>Verify your email address</Heading>

            <Text style={paragraph}>
              Hey there, Welcome to GhostPOV. To complete your registration and
              start using your account, please verify your email address by
              clicking the button below.
            </Text>

            <Section style={buttonContainer}>
              <Button href={url} style={button}>
                Click here to verify
              </Button>
            </Section>

            <Text style={paragraph}>
              This verification link was sent to{" "}
              <strong style={bold}>{email}</strong>. If you didn&apos;t create
              an account with GhostPOV, you can safely ignore this email.
            </Text>

            <Text style={paragraph}>
              If the button above doesn&apos;t work, you can also copy and paste
              this link into your browser:
            </Text>

            <Text style={linkText}>
              <Link href={url} style={link}>
                {url}
              </Link>
            </Text>

            <Text style={paragraph}>
              This verification link will expire in 24 hours for your
              security.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © 2025 GhostPOV. All rights reserved.
            </Text>
            <Text style={footerText}>
              If you have any questions, feel free to contact our support team.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Plain text version 
export function VerifyEmailText({
  email,
  url,
}: VerifyEmailTemplateProps): string {
  return `
Hey there! Welcome to GhostPOV.

To complete your registration and start using your account, please verify your email address by visiting the following link:
${url}

This verification link was sent to ${email}. If you didn't create an account with GhostPOV, you can safely ignore this email.

This verification link will expire in 24 hours for your security.

© 2025 GhostPOV. All rights reserved.
If you have any questions, feel free to contact our support team.
`.trim();
}

// Styles (for template)
const main = {
  backgroundColor: "#f8fafc",
  fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const logoContainer = {
  textAlign: "center" as const,
  padding: "32px 0",
};

const logo = {
  color: "#1f2937",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0",
  textAlign: "center" as const,
};

const content = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "32px",
  margin: "0 20px",
};

const heading = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  border: "none",
  cursor: "pointer",
};

const bold = {
  fontWeight: "600",
  color: "#1f2937",
};

const linkText = {
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "16px 0",
  wordBreak: "break-all" as const,
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};

const footer = {
  textAlign: "center" as const,
  margin: "48px 20px 0",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "8px 0",
};
