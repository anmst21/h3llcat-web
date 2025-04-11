"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";
import nodemailer from "nodemailer";
import { emailHtml } from "@/helpers/emails/WelcomingEmail";
import { SubscribeFormSchema } from "@/components/subscribe-input/subscribe-form-schema";

const SECRET_KEY = process.env.RECAPCHA_BACKEND_KEY;

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
});

export async function subscribeUser(
  formData: SubscribeFormSchema,
  token: string | undefined
) {
  try {
    if (!token) {
      return { success: false, message: "CAPTCHA token is missing" };
    }

    const { email } = formData;

    const verificationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: SECRET_KEY || "",
          response: token,
        }),
      }
    );

    console.log("verificationResponse", verificationResponse);

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success || verificationResult.score < 0.5) {
      // If the score is too low, reject the submission
      return {
        success: false,
        message: "CAPTCHA verification failed. You might be a bot!",
      };
    }

    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
      email_address: email,
      status: "subscribed", // or "pending" for double opt-in
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const html = await emailHtml;

    await transporter.sendMail({
      from: `My Newsletter${process.env.GMAIL_USER}`,
      to: email,
      subject: "Welcome to My Newsletter!",
      html: html,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error in subscribeUser:", error);

    if (error.response?.status === 400) {
      return {
        success: true,
        message: "User already subscribed",
      };
    }

    // For any other errors, return a subscription failure response.
    return {
      success: false,
      message: "Subscription failed",
      error: error.response?.data || error.message || "Unknown error",
    };
  }
}
