import { resend } from "@/lib/email/resend";
import {
  VerifyEmailTemplate,
  VerifyEmailText,
  ResetPasswordTemplate,
  ResetPasswordText,
  ChangeEmailTemplate,
  ChangeEmailText,
} from "@/components/server";
import { BaseResponse } from "@/types";

const emailType = {
  verify: {
    subject: "Account Verification",
    template: VerifyEmailTemplate,
    text: VerifyEmailText,
  },
  reset: {
    subject: "Reset Password",
    template: ResetPasswordTemplate,
    text: ResetPasswordText,
  },
  change: {
    subject: "Approve Email Change",
    template: ChangeEmailTemplate,
    text: ChangeEmailText,
  },
};

type EmailType = keyof typeof emailType;

interface SendEmailParams {
  type: EmailType;
  email: string;
  name: string;
  url: string;
  newEmail?: string
}

export async function sendEmail({
  type,
  email,
  name,
  url,
  newEmail
}: SendEmailParams): Promise<BaseResponse> {
  try {
    await resend.emails.send({
      from: "GhostPOV <no-reply@ghostpov.xyz>",
      to: [email],
      subject: emailType[type].subject,
      react: emailType[type]["template"]({ name, url, newEmail }),
      text: emailType[type]["text"]({ name, url, newEmail }),
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
