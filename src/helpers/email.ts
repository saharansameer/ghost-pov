import { resend } from "@/lib/resend";
import { VerifyEmailTemplate } from "@/components";

export async function sendVerificationEmail(
  email: string,
  code: string
): Promise<BaseResponse> {
  try {
    await resend.emails.send({
      from: "GhostPOV <onboarding@ghostpov.xyz>",
      to: [email],
      subject: "Verification Code",
      react: VerifyEmailTemplate({ email, code }),
      text: `Thanks for starting the new GhostPOV account creation process. 
        We want to make sure it's really you. \n 
        Please verify your email ${email}. \n
        Verification Code: ${code} \n
        This code is valid for 10 minutes.
        `,
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
