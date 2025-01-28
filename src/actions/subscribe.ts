"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";
// import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { emailHtml } from "@/helpers/WelcomingEmail";
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
});

export async function subscribeUser(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
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
  } catch (error) {
    console.error("Error in subscribeUser:", error);
    throw new Error("Subscription failed");
  }
}
