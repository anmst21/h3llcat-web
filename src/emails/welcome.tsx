import {
  Section,
  Img,
  Html,
  Head,
  Font,
  Text,
  Heading,
} from "@react-email/components";
import * as React from "react";
import Footer from "./footer";
import Divider from "./divider";
import Header from "./header";

export default function WelcomingEmail() {
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
      <Section style={{ marginTop: 16, marginBottom: 16 }}>
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
      </Section>
      <Divider />
      <Footer />
    </Html>
  );
}
