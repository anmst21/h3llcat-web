import { NextResponse, NextRequest } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { verifySanitySignature } from "@/helpers/verifySanitySignature";
import { render } from "@react-email/render";
import NewPost from "@/emails/new-post";
import { getBlogposts } from "@/sanity/sanity-utils";
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
});

export async function POST(request: NextRequest) {
  // Read the raw request body as text (needed for HMAC verification)
  const rawBody = await request.text();
  //  console.log("[POST] Raw body:", rawBody);

  // Extract the signature header from Sanity (format: "t=timestamp,v1=signature")
  const signatureHeader = request.headers.get("sanity-webhook-signature");
  // console.log("[POST] Signature Header:", signatureHeader);

  if (!signatureHeader) {
    console.error("[POST] Missing signature header");
    return NextResponse.json(
      { error: "Missing signature header" },
      { status: 401 }
    );
  }

  // Verify the signature using our external function
  const verification = verifySanitySignature(
    rawBody,
    signatureHeader,
    process.env.SANITY_WEBHOOK_SECRET!
  );

  if (!verification.verified) {
    console.error("[POST] Signature verification failed:", verification.error);
    return NextResponse.json({ error: verification.error }, { status: 401 });
  }

  // console.log("[POST] Signature verification succeeded");

  // Now that the signature is verified, parse the JSON payload
  let data;
  try {
    data = JSON.parse(rawBody);
  } catch (parseError) {
    console.error("[POST] Error parsing JSON body:", parseError);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // console.log("[POST] Verified webhook data from Sanity:", data);

  // Proceed with your business logic (e.g., sending a Mailchimp campaign)
  const {
    name,
    //  slug
  } = data;
  try {
    const campaign = await mailchimp.campaigns.create({
      type: "regular",
      recipients: { list_id: process.env.MAILCHIMP_AUDIENCE_ID! },
      settings: {
        subject_line: `New blog post: ${name}`,
        title: `Blog Update: ${name}`,
        from_name: "Display - NFT Marketplace",
        from_email: "anmstudios21c@gmail.com",
        reply_to: "anmstudios21c@gmail.com",
      },
    });

    const { blogposts } = await getBlogposts();

    const html = await render(NewPost({ posts: blogposts }), { pretty: true });
    const text = await render(NewPost({ posts: blogposts }), {
      plainText: true,
    });
    await mailchimp.campaigns.setContent(campaign.id, { html, text });
    await mailchimp.campaigns.send(campaign.id);

    // console.log("[POST] Mailchimp campaign sent for new post:", name);

    return NextResponse.json(
      { message: "New-post campaign sent!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST] Error sending new blog post campaign:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
