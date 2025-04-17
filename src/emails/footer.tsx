import {
  Section,
  Row,
  Column,
  Img,
  Link,
  Html,
  Head,
  Font,
  Text,
  Button,
  Heading,
  Hr,
} from "@react-email/components";

export default function EmailFooter() {
  return (
    <Section style={{ maxWidth: 820, marginTop: 20, marginBottom: 60 }}>
      <Row>
        <Column colSpan={4}>
          <Link href="https://h3llcat.app/">
            <Img
              alt="React Email logo"
              height="42"
              src="https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/logo-letter.png"
            />
          </Link>
          <Text
            style={{
              marginTop: 8,
              marginBottom: 8,
              fontSize: 21,

              lineHeight: "24px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            Display
          </Text>
          <Text
            style={{
              marginTop: 4,
              marginBottom: "0px",
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "19px",
              color: "rgba(0, 0, 0, 0.40)",
            }}
          >
            SWIPE. COLLECT. REPEAT.
          </Text>
        </Column>
        <Column
          align="right"
          style={{ display: "table-cell", verticalAlign: "bottom" }}
        >
          <Row
            style={{
              display: "table-cell",
              height: 44,
              width: 56,
              verticalAlign: "bottom",
            }}
          >
            <Column style={{ paddingRight: 8 }}>
              <Link href="https://x.com/0xN3XUS">
                <Img
                  alt="Facebook"
                  height="36"
                  src="https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/socials-icons/x.jpg"
                  width="36"
                  style={{ borderRadius: 5 }}
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: 8 }}>
              <Link href="https://www.linkedin.com/company/n3xus-nyc/">
                <Img
                  alt="X"
                  height="36"
                  src="https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/socials-icons/linked-in.jpg"
                  width="36"
                  style={{ borderRadius: 5 }}
                />
              </Link>
            </Column>
            <Column>
              <Link href="https://warpcast.com/ragingincel.eth">
                <Img
                  alt="Instagram"
                  height="36"
                  src="https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/socials-icons/farcaster.jpg"
                  width="36"
                  style={{ borderRadius: 5 }}
                />
              </Link>
            </Column>
          </Row>
          <Row align="right">
            <Text
              style={{
                marginTop: 8,
                marginBottom: 8,
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 400,
                color: "rgba(0, 0, 0, 0.40)",
                textAlign: "end",
              }}
            >
              99 Hudson St, New York, NY 10013, USA
            </Text>
            <Text
              style={{
                marginTop: 4,
                textAlign: "end",

                marginBottom: "0px",
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 400,
                color: "rgba(0, 0, 0, 0.40)",
              }}
            >
              support@display.app +1(845)332-40-43
            </Text>
          </Row>
        </Column>
      </Row>
    </Section>
  );
}
