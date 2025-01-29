import LinkButton from "@/components/button/link-button";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="blog">
      <div className="blog-cta">
        <div className="blog-cta__heading">
          <span>Explore</span>
          <span>Display's</span>
          <span>Updates</span>
        </div>
        <div className="blog-cta__paragraph">
          <p>
            Follow our blog for the latest news, feature launches, and insights
            into Display's platform.
          </p>
          <LinkButton />
        </div>
      </div>
      {children}
    </div>
  );
}
