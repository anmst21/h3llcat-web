import { Section, Row, Column, Img, Link } from "@react-email/components";

export default function EmailHeader() {
  return (
    <Section
      style={{
        maxWidth: 820,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <Row style={{ fontFamily: "SF Pro Text", fontWeight: 400 }}>
        <Column style={{ width: "80%" }}>
          <Link href="https://h3llcat.app/">
            <Img
              style={{ borderRadius: 5, overflow: "hidden" }}
              alt="Display Email logo"
              height="48"
              src="https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/logo-letter.jpg"
            />
          </Link>
        </Column>

        <Column align="right">
          <Row align="right">
            <Column style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Link
                href="https://h3llcat.app/beta"
                style={{
                  //   fontWeight: 400,
                  //     fontFamily: "SF-Pro",
                  color: "#93918E",
                  textDecoration: "none",
                }}
              >
                BETA
              </Link>
            </Column>
            <Column style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Link
                href="https://h3llcat.app/contacts"
                style={{ color: "#93918E", textDecoration: "none" }}
              >
                CONTACTS
              </Link>
            </Column>
            <Column style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Link
                href="https://h3llcat.app/privacy"
                style={{ color: "#93918E", textDecoration: "none" }}
              >
                PRIVACY
              </Link>
            </Column>
          </Row>
        </Column>
      </Row>
    </Section>
  );
}
