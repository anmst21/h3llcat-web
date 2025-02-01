import PageHeader from "@/components/page-header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="blog">
      <PageHeader
        btnContent="Subscribe"
        href="/subscribe"
        subHeader="Follow our blog for the latest news, feature launches, and insights into Display's platform"
        text={["Explore", "Display's", "Updates"]}
      />
      {children}
    </div>
  );
}
