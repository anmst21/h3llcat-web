import {
  Section,
  Img,
  Html,
  Head,
  Font,
  Text,
  Heading,
  Button,
} from "@react-email/components";
import * as React from "react";
import Footer from "./footer";
import Divider from "./divider";
import Header from "./header";

export default function BetaEmail() {
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
          alt="Thumbnail Beta"
          height={445}
          width={731}
          src="https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/thumb-beta.png"
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
            Explore, Create, Collect.
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
            Your Beta Entry Is Confirmed
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
            Thanks for joining our raffle! We'll select the most active on-chain
            users about a month from now, so keep collecting and exploring. Best
            of luck in securing your Beta pass!
          </Text>
          <Button
            style={{
              color: "#050915",
              backgroundColor: "#FFCC00",
              borderRadius: 20,
              marginBottom: 60,
              marginTop: 30,
              padding: 24,
              paddingLeft: 72,
              fontWeight: 600,
              paddingRight: 72,
              alignItems: "center",
            }}
            href="https://h3llcat.app/subscribe"
          >
            SUBSCRIBE TO NEWSLETTER
          </Button>
        </Section>
      </Section>
      <Divider />
      <Footer />
    </Html>
  );
}
