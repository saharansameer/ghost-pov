import { resend } from "@/lib/resend";
import { VerifyEmailTemplate, VerifyEmailText } from "@/components/client";

const emailType = {
  "verify": {
    template: VerifyEmailTemplate,
    text: VerifyEmailText,
  }
};

type EmailType = keyof typeof emailType;

interface SendEmailParams {
  type: EmailType;
  email: string;
  url: string;
}

export async function sendEmail({
  type,
  email,
  url,
}: SendEmailParams): Promise<BaseResponse> {
  try {
    await resend.emails.send({
      from: "GhostPOV <onboarding@ghostpov.xyz>",
      to: [email],
      subject: "Account Verification",
      react: emailType[type]["template"]({ email, url }),
      text: emailType[type]["text"]({ email, url }),
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
