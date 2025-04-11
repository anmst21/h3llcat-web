import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  render,
} from "@react-email/components";

export default function WelcomingEmail({
  title,
  slug,
}: {
  title: string;
  slug: string;
}): React.ReactElement {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#fff" }}>
        <Container
          style={{ margin: "0 auto", maxWidth: "600px", padding: "40px" }}
        >
          <Heading style={{ marginBottom: "20px" }}>{title}</Heading>
          <Text>{slug}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export const emailHtml = async (title: string, slug: string) =>
  await render(<WelcomingEmail title={title} slug={slug} />);
