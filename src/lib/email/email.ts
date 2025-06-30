import { resend } from "@/lib/email/resend";
import {
  VerifyEmailTemplate,
  VerifyEmailText,
  ResetPasswordTemplate,
  ResetPasswordText
} from "@/components/server";
import { BaseResponse } from "@/types";

const emailType = {
  verify: {
    sender: "GhostPOV <no-reply@ghostpov.xyz>",
    subject: "Account Verification",
    template: VerifyEmailTemplate,
    text: VerifyEmailText,
  },
  reset: {
    sender: "GhostPOV <no-reply@ghostpov.xyz>",
    subject: "Reset Password",
    template: ResetPasswordTemplate,
    text: ResetPasswordText,
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
      from: emailType[type].sender,
      to: [email],
      subject: emailType[type].subject,
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
