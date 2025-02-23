import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail( email, username, verifyCode){
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'JioClone | Verification code',
      react: VerificationEmail({ username: username, otp: verifyCode }),
    });
    return {success: true, message: "Verification email sent successfully"}
  } catch (error) {
    console.error("Error sending verification email", error)
  }
}