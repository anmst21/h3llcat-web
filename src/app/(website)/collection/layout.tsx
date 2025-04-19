import PreviewBackground from "@/components/app-redirect/preview-background";
import ThreeScene from "@/components/three-scene";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch("http://localhost:3000/assets-redirect.json");
  // ↳ replace localhost:3000 with your VERCEL_URL or process.env if needed
  if (!res.ok) {
    throw new Error("Could not fetch redirects JSON");
  }

  const redirects = await res.json();
  return (
    <div className="nft">
      {children}

      <PreviewBackground redirects={redirects} />
    </div>
  );
}
