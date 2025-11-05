"use server";

import { SubscribeFormSchema } from "@/components/subscribe-input/subscribe-form-schema";
import nodemailer from "nodemailer";
import BetaEmail from "@/emails/beta";
import { render } from "@react-email/render";

import { prisma } from "@/lib/prisma";

export async function submitBeta(
  emailData: SubscribeFormSchema,
  did: string
): Promise<any> {
  try {
    if (!emailData.email) {
      throw new Error("Email is required for subscription.");
    }
    const email = emailData.email;

    const user = await prisma.userData.findUnique({
      where: { did },
    });

    if (!user) {
      throw new Error(`User with DID ${did} not found`);
    }

    const updatedUser = await prisma.userData.update({
      where: { did },
      data: { email },
    });

    // Make the POST request
    // const response = await fetch(`${apiUriSubmitBeta}?email=${email}`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    const html = await render(BetaEmail(), { pretty: true });
    const text = await render(BetaEmail(), { plainText: true });

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
      subject: "Congratulations! Welcome to Display's Beta raffle",
      html,
      text,
    });

    // Parse and return the JSON data from the response

    // const data: {
    //   did: string;
    //   email: string | null;
    //   totalMints: number;
    //   yourMintsCount: number;
    // } = await response.json();

    return {
      did: updatedUser.did,
      email: updatedUser.email,
      isMinted: updatedUser.isMinted,
    };
  } catch (error: any) {
    // Log the error and rethrow it so calling code can handle it
    console.error("Error submitting beta form:", error);
    throw error;
  }
}
