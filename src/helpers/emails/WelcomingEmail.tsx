import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  render,
} from "@react-email/components";

export default function WelcomingEmail(): React.ReactElement {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#fff" }}>
        <Container
          style={{ margin: "0 auto", maxWidth: "600px", padding: "40px" }}
        >
          <Heading style={{ marginBottom: "20px" }}>My Bulk Newsletter</Heading>
          <Text>
            This is the content you'd like to send to everyone on the Mailchimp
            list!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const emailHtml = render(<WelcomingEmail />);
