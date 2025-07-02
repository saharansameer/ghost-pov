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

interface ChangeEmailTemplateProps {
  name: string;
  url: string;
  newEmail?: string;
}

// Template
export function ChangeEmailTemplate({
  name,
  url,
  newEmail,
}: ChangeEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Hey {name}, Confirm your new email address for GhostPOV.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={logo}>Approve Email Change</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Hey <strong style={bold}>{name}</strong>,
            </Text>

            <Text style={paragraph}>
              We&apos;ve received a request to change the email address
              associated with your GhostPOV account.
            </Text>

            <Text style={paragraph}>
              Your account will be linked to the following email address:{" "}
              <i>{newEmail}</i>
            </Text>

            <Text style={paragraph}>
              To confirm this change, please click the button below:
            </Text>

            <Section style={buttonContainer}>
              <Button href={url} style={button}>
                Confirm
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
              This link will expire in 24 hours for your security. If you
              didn&apos;t requested this change, you can ignore this email.
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
export function ChangeEmailText({
  name,
  url,
  newEmail,
}: ChangeEmailTemplateProps): string {
  return `
Hey ${name},
We received a request to change the email address associated with your GhostPOV account.

Your account will be linked to the following email address: ${newEmail}
To confirm this change, visit the following link:
${url}

This link will expire in 24 hours for your security. If you didn't requested this change, you can ignore this email.

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
