import { resend } from "@/lib/resend";
import { VerifyEmailTemplate } from "@/components";

export async function sendVerificationEmail(
  email: string,
  code: string
): Promise<BaseResponse> {
  try {
    await resend.emails.send({
      from: "GhostPOV <noreply@ghostpov.xyz>",
      to: [email, "delivered@resend.dev"],
      subject: "Verification Code",
      react: VerifyEmailTemplate({ email, code }),
    });

    return {
      success: true,
      message: "Verification Code sent successfully",
    };
  } catch (error) {
    console.error("Verification Email Error:", error);
    return {
      success: false,
      message: "Failed to send Verification Email",
    };
  }
}