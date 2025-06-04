import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailTemplateProps {
  email: string;
  code: string
}

export function VerifyEmailTemplate({
  email, code
}: Readonly<VerifyEmailTemplateProps> ) { return (
  <Html>
    <Head />
    <Body>
      <Preview>GhostPOV Account Verification</Preview>
      <Container >
        <Section >
          <Section>
            <Img
              src={""}
              width="75"
              height="45"
              alt="GhostPOV Logo"
            />
          </Section>
          <Section >
            <Heading>Verify Your Account</Heading>
            <Text >
              Thanks for starting the new GhostPOV account creation process. We want
              to make sure it`&apos;`s really you. Please verify your email {email}.
            </Text>
            <Section >
              <Text >Verification code</Text>
              <Text >{code}</Text>
              <Text >
                (This code is valid for 10 minutes)
              </Text>
            </Section>
          </Section>
          <Hr />
        </Section>
      </Container>
    </Body>
  </Html>
)}
