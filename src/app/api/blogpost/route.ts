// import { NextResponse, NextRequest } from "next/server";
// import mailchimp from "@mailchimp/mailchimp_marketing";
// import { emailHtml } from "@/helpers/BlogPostEmail";

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY!,
//   server: process.env.MAILCHIMP_SERVER_PREFIX!,
// });

// export async function POST(request: NextRequest) {
//   try {
//     // 1. Parse request body from Sanity
//     const data = await request.json();
//     console.log("Received from Sanity webhook:", data);

//     // (Assumes `data` has post title, slug, etc.
//     //  Adjust variable names as needed.)
//     const { title, slug } = data;

//     // 2. Create a Mailchimp "regular" campaign to send to your entire audience
//     const campaign = await mailchimp.campaigns.create({
//       type: "regular",
//       recipients: {
//         // The ID of the list/audience you want to email
//         list_id: process.env.MAILCHIMP_AUDIENCE_ID!,
//       },
//       settings: {
//         subject_line: `New blog post: ${title}`,
//         title: `Blog Update: ${title}`, // internal name in Mailchimp
//         from_name: "Display - NFT Marketplace",
//         from_email: "anmstudios21c@gmail.com", // must be valid & verified
//         reply_to: "anmstudios21c@gmail.com",
//       },
//     });

//     const newPostHtml = await emailHtml(title, slug);

//     // 3. Render custom HTML with React Email

//     // 4. Set the campaign content to your rendered HTML
//     await mailchimp.campaigns.setContent(campaign.id, {
//       html: newPostHtml,
//     });

//     // 5. Send the campaign to everyone on that list
//     await mailchimp.campaigns.send(campaign.id);

//     return NextResponse.json(
//       { message: "New-post campaign sent!" },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error sending new blog post campaign:", err);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
