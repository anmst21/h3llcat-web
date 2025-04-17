import { formatBlogDate } from "@/helpers/formatBlogDate";
import { Text, Column, Row } from "@react-email/components";

export default function MailPostDate({
  authorName,
  date,
}: {
  authorName: string;
  date: string;
}) {
  return (
    <Row
      style={{
        display: "inline-block",
        marginTop: 15,
        marginBottom: 10,
      }}
      align="center"
    >
      <Column style={{ display: "inline-block" }}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: "18px",
            fontWeight: 500,
            color: "rgba(5, 9, 21, 0.50)",
            margin: 0,
            display: "inline-block",
            marginRight: 10,
          }}
        >
          {formatBlogDate(new Date(date))}
        </Text>
      </Column>

      <Column
        style={{
          width: "1px",
          backgroundColor: "rgba(147,145,142,0.5)",
          // adjust height to taste, or use padding for vertical spacing
          height: "18px",

          // horizontal spacing around the line
        }}
      ></Column>
      <Column style={{ display: "inline-block" }}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 14,
            lineHeight: "18px",
            fontWeight: 500,
            color: "rgba(5, 9, 21, 0.50)",
            margin: 0,
            display: "inline-block",
          }}
        >
          {authorName}
        </Text>
      </Column>
    </Row>
  );
}
