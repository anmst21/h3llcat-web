import {
  Section,
  Img,
  Html,
  Head,
  Font,
  Text,
  Heading,
  Row,
  Column,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";
import Footer from "./footer";
import Divider from "./divider";
import Header from "./header";
import { formatBlogDate } from "@/helpers/formatBlogDate";
import MailPostDate from "./post-date";

export default function NewPost({ posts }: { posts: any }) {
  return (
    <Html style={{ backgroundColor: "#EEEEF2" }}>
      <Head>
        <Font
          fontFamily="SF Pro Text"
          fallbackFontFamily="Times New Roman"
          webFont={{
            url: "https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/apple-fonts/SFProText-Medium.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>
      <Header />
      {/* <Section style={{ marginTop: 16, marginBottom: 16 }}>
        <Img
          alt="Thumbnail Newsletter"
          height={445}
          width={731}
          src="https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/thumb-mail.jpg"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            //  borderRadius: 12,
            height: "auto",
            maxWidth: 731,
            objectFit: "cover",
          }}
        />
        <Section style={{ marginTop: 32, textAlign: "center" }}>
          <Text
            style={{
              marginTop: 0,
              fontSize: 18,
              lineHeight: "28px",
              fontWeight: 500,
              color: "#0033FF",
            }}
          >
            Signed. Sealed. Delivered.
          </Text>
          <Heading
            as="h1"
            style={{
              fontSize: 36,
              lineHeight: "40px",
              fontWeight: 700,

              color: "#050915",
            }}
          >
            Thanks for Subscribing!
          </Heading>
          <Text
            style={{
              marginTop: 8,
              fontSize: 16,
              lineHeight: "24px",
              color: "rgba(5, 9, 21, 0.80)",
              maxWidth: 730,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Welcome to Display's subscriber circle. Keep an eye on your inbox
            for new feature releases, Beta updates, and exclusive NFT
            opportunities.
          </Text>
        </Section>
      </Section> */}
      <Section style={{ maxWidth: 820, marginTop: 20, marginBottom: 40 }}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: "18px",
            fontWeight: 600,
            color: "#03F",
            margin: 0,
            marginBottom: 10,
            marginTop: 30,
          }}
        >
          JUST IN
        </Text>
        <Text
          style={{
            margin: 0,

            color: "#050915",
            fontSize: 48,
            lineHeight: "52px",
            fontWeight: 700,
          }}
        >
          New Post
        </Text>
        <Hr
          style={{
            borderColor: "rgba(147, 145, 142, 0.50) !important",
            marginTop: 0,
            marginBottom: "0px",
            maxWidth: 820,
          }}
        />
      </Section>

      <Section style={{ maxWidth: 820, marginBottom: 40 }}>
        <Link href={"https://h3llcat.app" + "/blog/" + posts[0].slug}>
          <Row style={{ marginBottom: 40 }}>
            <Column
              colSpan={1}
              style={{
                //  width: "50%",
                verticalAlign: "baseline",
                paddingRight: 8,
                boxSizing: "border-box",
                // maxWidth: 731,
              }}
            >
              <Img
                alt={posts[0].alt}
                height={445}
                width={731}
                src={posts[0].image}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  //  borderRadius: 12,
                  height: "auto",
                  maxWidth: 820,
                  objectFit: "cover",
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: "18px",
                  fontWeight: 600,
                  color: "#03F",
                  margin: 0,
                  marginBottom: 10,
                  marginTop: 30,
                }}
              >
                THE LATEST
              </Text>

              <Text
                style={{
                  margin: "0px",
                  fontSize: 32,
                  lineHeight: "36px",
                  fontWeight: 700,
                  color: "rgba(5, 9, 21, 0.80)",
                }}
              >
                {posts[0].name}
              </Text>
              <MailPostDate
                authorName={posts[0].author.name}
                date={posts[0]._createdAt}
              />
              <Text
                style={{
                  marginBottom: "0px",
                  marginTop: 8,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "rgba(5, 9, 21, 0.6)",
                }}
              >
                {posts[0].subheader}
              </Text>
            </Column>
          </Row>
        </Link>

        <Row
          style={{
            marginTop: 16,
            //      maxWidth: 731,
          }}
        >
          <Column
            colSpan={1}
            style={{
              width: "50%",
              verticalAlign: "baseline",
              paddingRight: 8,
              boxSizing: "border-box",
            }}
          >
            <Link href={"https://h3llcat.app" + "/blog/" + posts[1].slug}>
              <Hr
                style={{
                  borderColor: "rgba(147, 145, 142, 0.50) !important",
                  marginTop: 0,
                  marginBottom: 20,
                  maxWidth: 820,
                }}
              />
              <Img
                alt={posts[1].alt}
                height={445}
                width={731}
                src={posts[1].image}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  //  borderRadius: 12,
                  height: "auto",
                  maxWidth: 820,
                  objectFit: "cover",
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: "18px",
                  fontWeight: 600,
                  color: "#03F",
                  margin: 0,
                  marginBottom: 10,
                  marginTop: 30,
                }}
              >
                FEATURED
              </Text>
              <Text
                style={{
                  margin: "0px",
                  fontSize: 20,
                  lineHeight: "28px",
                  fontWeight: 600,
                  color: "rgb(17,24,39)",
                }}
              >
                {posts[1].name}
              </Text>

              <Text
                style={{
                  marginBottom: "0px",
                  marginTop: 8,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "rgba(5, 9, 21, 0.80)",
                }}
              >
                {posts[1].subheader}
              </Text>
            </Link>
          </Column>

          <Column
            colSpan={1}
            style={{
              width: "50%",
              verticalAlign: "baseline",
              paddingLeft: 8,
              boxSizing: "border-box",
            }}
          >
            <Link href={"https://h3llcat.app" + "/blog/" + posts[2].slug}>
              <Hr
                style={{
                  borderColor: "rgba(147, 145, 142, 0.50) !important",
                  marginTop: 0,
                  marginBottom: 20,
                  maxWidth: 820,
                }}
              />
              <Img
                alt={posts[2].alt}
                height={445}
                width={731}
                src={posts[2].image}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  //  borderRadius: 12,
                  height: "auto",
                  maxWidth: 820,
                  objectFit: "cover",
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: "18px",
                  fontWeight: 600,
                  color: "#03F",
                  margin: 0,
                  marginBottom: 10,
                  marginTop: 30,
                }}
              >
                PREVIOUS
              </Text>
              <Text
                style={{
                  margin: "0px",
                  fontSize: 20,
                  lineHeight: "28px",
                  fontWeight: 600,
                  color: "rgb(17,24,39)",
                }}
              >
                {posts[2].name}
              </Text>

              <Text
                style={{
                  marginBottom: "0px",
                  marginTop: 8,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "rgba(5, 9, 21, 0.80)",
                }}
              >
                {posts[2].subheader}
              </Text>
            </Link>
          </Column>
        </Row>
      </Section>
      <Divider />
      <Footer />
    </Html>
  );
}

// const posts = [
//   {
//     image:
//       "https://cdn.sanity.io/images/du4or4nz/production/932cc9017e578e8847f754a86dbae0a6ace81a32-1380x840.jpg",
//     alt: "Display’s Main Features Cover",
//     _id: "ac9ec261-af66-4a70-9fc5-5e7577b9adfb",
//     name: "Display’s Main Features",
//     subheader:
//       "Experience on-chain art discovery reimagined—Display turns swiping through NFT collections into an effortless, one-handed adventure. Powered by seamless wallet integrations and crisp, optimized visuals, every gesture brings you closer to a breathtaking digital art journey.",
//     slug: "display-main-features",
//     featured: true,
//     category: {
//       _id: "af92f9c2-3170-43fa-abf9-6569217b1e2d",
//       title: "Guides",
//       slug: "guides",
//     },
//     author: {
//       _id: "582efce8-c804-42cb-ba6b-1285fc8118a9",
//       name: "Display Team",
//       image:
//         "https://cdn.sanity.io/images/du4or4nz/production/5b58a3ecf2b86a30e77ffaaad8b1f43f06403f9d-400x400.png",
//       alt: "Display Logo",
//     },
//     _createdAt: "2025-02-06T04:02:28Z",
//   },
//   {
//     _createdAt: "2025-01-28T21:13:55Z",
//     name: "Sharing Your Favorite Posts with Display",
//     image:
//       "https://cdn.sanity.io/images/du4or4nz/production/33206d0b4d75bfa59a9360fd3c26c492875f87b2-1380x840.jpg",
//     featured: null,
//     author: {
//       _id: "582efce8-c804-42cb-ba6b-1285fc8118a9",
//       name: "Display Team",
//       image:
//         "https://cdn.sanity.io/images/du4or4nz/production/5b58a3ecf2b86a30e77ffaaad8b1f43f06403f9d-400x400.png",
//       alt: "Display Logo",
//     },
//     _id: "38c85d6d-10e6-475c-b77a-642a0ec0d59e",
//     subheader:
//       "Instantly share your favorite on-chain art with friends using Apple Universal Links—one tap sends them directly into Display. Whether they have the app installed or not, they can view, comment, and even mint NFTs seamlessly, making art discovery as social as it is simple.",
//     slug: "sharing-posts",
//     alt: "Display Share Posts thumbnail ",
//     category: {
//       _id: "af92f9c2-3170-43fa-abf9-6569217b1e2d",
//       title: "Guides",
//       slug: "guides",
//     },
//   },
//   {
//     featured: false,
//     name: "Our Wallet Approach: Seamless On-Chain Access & Embedded Convenience",
//     subheader:
//       "Experience an on-chain journey completely built into your iPhone with Display's innovative wallet integrations—no pop-ups or extra tabs required. Whether you're using Coinbase's Mobile Wallet Protocol or setting up a Privy-powered embedded wallet, minting art has never been more secure, seamless, and effortless.",
//     alt: "Display Wallet Integration thumbnail",
//     category: {
//       _id: "14501d95-7300-44d7-92d6-87245b0996d0",
//       title: "News",
//       slug: "news",
//     },
//     author: {
//       _id: "582efce8-c804-42cb-ba6b-1285fc8118a9",
//       name: "Display Team",
//       image:
//         "https://cdn.sanity.io/images/du4or4nz/production/5b58a3ecf2b86a30e77ffaaad8b1f43f06403f9d-400x400.png",
//       alt: "Display Logo",
//     },
//     _id: "795f2bdf-1554-4a89-a288-f8ef7d0f1b2d",
//     _createdAt: "2025-01-28T21:11:22Z",
//     slug: "display-wallet-approach",
//     image:
//       "https://cdn.sanity.io/images/du4or4nz/production/43423bd98de51d61762c4b317202887c7bfff91f-1380x840.jpg",
//   },
//   {
//     _id: "60b0582a-5977-4ea7-89da-e70d414a3247",
//     name: "How to Share Your Feedback with Display",
//     subheader:
//       "Your voice is at the heart of Display’s evolution—every suggestion and bug report drives us to perfect your on-chain discovery experience. Whether you're reaching out via our website, email, or in-app feedback, your insights help shape a smoother, more intuitive journey with Display.",
//     image:
//       "https://cdn.sanity.io/images/du4or4nz/production/479de6e19dd9d4bacfc08796989d46b8b845e1f5-1380x840.jpg",
//     category: {
//       _id: "af92f9c2-3170-43fa-abf9-6569217b1e2d",
//       title: "Guides",
//       slug: "guides",
//     },
//     author: {
//       _id: "582efce8-c804-42cb-ba6b-1285fc8118a9",
//       name: "Display Team",
//       image:
//         "https://cdn.sanity.io/images/du4or4nz/production/5b58a3ecf2b86a30e77ffaaad8b1f43f06403f9d-400x400.png",
//       alt: "Display Logo",
//     },
//     _createdAt: "2025-01-28T21:06:40Z",
//     slug: "share-your-feedback",
//     alt: "Share Your Feedback thumbnail",
//     featured: null,
//   },
//   {
//     _id: "629e2c67-8871-4852-9c1b-bfd4aebf8bed",
//     name: "Display Website Launch: Mint Your Beta Pass NFT Today",
//     subheader:
//       "Display is thrilled to unveil our brand-new website along with the Display Beta Pass NFT—your exclusive ticket to early beta access and cutting-edge on-chain minting features. Mint your Beta Pass now to secure your spot among the top 150 testers and experience swipe-to-mint innovation, one-handed navigation, and seamless wallet integrations on iOS.",
//     slug: "beta-pass-launch",
//     image:
//       "https://cdn.sanity.io/images/du4or4nz/production/a61898da9a22449c1426193c342c22e784841ce6-1380x840.jpg",
//     alt: "beta pass launch thumbnail",
//     featured: true,
//     author: {
//       _id: "6e26f4b4-96b9-4659-a2a7-62d33502615f",
//       name: "Nexus Technologies",
//       image:
//         "https://cdn.sanity.io/images/du4or4nz/production/cdf54b9549c0d8fb6a13013e23a610b16d32a532-400x400.png",
//       alt: "Nexus Logo",
//     },
//     _createdAt: "2025-01-28T20:58:44Z",
//     category: {
//       _id: "aa342ea5-e596-4926-9335-596d5ac5297e",
//       title: "Updates",
//       slug: "updates",
//     },
//   },
// ];
