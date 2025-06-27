import { resend } from "@/lib/email/resend";
import { VerifyEmailTemplate, VerifyEmailText } from "@/components/client";
import { BaseResponse } from "@/types";

const emailType = {
  verify: {
    template: VerifyEmailTemplate,
    text: VerifyEmailText,
  },
};

type EmailType = keyof typeof emailType;

interface SendEmailParams {
  type: EmailType;
  email: string;
  name: string;
  url: string;
}

export async function sendEmail({
  type,
  email,
  name,
  url,
}: SendEmailParams): Promise<BaseResponse> {
  try {
    await resend.emails.send({
      from: "GhostPOV <onboarding@ghostpov.xyz>",
      to: [email],
      subject: "Account Verification",
      react: emailType[type]["template"]({ name, url }),
      text: emailType[type]["text"]({ name, url }),
    });

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Email Helper Error:", error);
    return {
      success: false,
      message: "Failed to send Email",
    };
  }
}
