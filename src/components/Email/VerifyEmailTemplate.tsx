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
  name: string;
  url: string;
}

// Template
export function VerifyEmailTemplate({ name, url }: VerifyEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify Your GhostPOV Account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={logo}>Welcome to GhostPOV</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Hey! <strong style={bold}>{name}</strong>, Welcome to GhostPOV. To
              complete your registration and start using your account, please
              verify your email address by clicking the button below.
            </Text>

            <Section style={buttonContainer}>
              <Button href={url} style={button}>
                Verify Account
              </Button>
            </Section>

            <Text style={paragraph}>
              If the button above doesn&apos;t work, you can also copy and paste
              the following link into your browser:
            </Text>

            <Text style={linkText}>
              <Link href={url} style={link}>
                {url}
              </Link>
            </Text>

            <Text style={footerText}>
              The verification link will expire in 24 hours for your security.
            </Text>

            <Text style={footerText}>
              By completing registration or verifying account you agree to our{" "}
              <Link href={"https://ghostpov.xyz/terms-of-service"} style={link}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={"https://ghostpov.xyz/privacy-policy"} style={link}>
                Privacy Policy
              </Link>
              .
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} GhostPOV. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Plain text version
export function VerifyEmailText({
  name,
  url,
}: VerifyEmailTemplateProps): string {
  return `
Hey ${name}! Welcome to GhostPOV.

To complete your registration and start using your account, please verify your email address by visiting the following link:
${url}

This verification link will expire in 24 hours for your security.

 By completing registration or verifying account you agree to our Terms of Service and Privacy Policy.
 Terms of Service: https://ghostpov.xyz/terms-of-service
 Privacy Policy: https://ghostpov.xyz/privacy-policy

© ${new Date().getFullYear()} GhostPOV. All rights reserved.
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
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "5px 0 16px 0",
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
