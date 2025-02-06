"use server";

import { SubscribeFormSchema } from "@/components/subscribe-input/subscribe-form-schema";
import { apiUriSubmitBeta } from "@/helpers/apiUri";
import { emailHtml } from "@/helpers/WelcomingEmail";
import nodemailer from "nodemailer";

export async function submitBeta(
  emailData: SubscribeFormSchema,
  token: string | null
): Promise<any> {
  try {
    if (!emailData.email) {
      throw new Error("Email is required for subscription.");
    }

    const email = encodeURIComponent(emailData.email);

    // Make the POST request
    const response = await fetch(`${apiUriSubmitBeta}?email=${email}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const html = await emailHtml;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `My Newsletter <${process.env.GMAIL_USER}>`, // Ensure a proper "from" field format
      to: emailData.email, // Use the raw email here
      subject: "Welcome to My Newsletter!",
      html: html,
    });

    // Parse and return the JSON data from the response
    const data = await response.json();
    return data;
  } catch (error: any) {
    // Log the error and rethrow it so calling code can handle it
    console.error("Error submitting beta form:", error);
    throw error;
  }
}
