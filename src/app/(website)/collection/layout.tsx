import PreviewBackground from "@/components/app-redirect/preview-background";
import posts from "../../../../assets-redirect.json";
import { Collection } from "@/types/CollectionCarousel";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const res = await fetch("/assets-redirect.json");
  // // ↳ replace localhost:3000 with your VERCEL_URL or process.env if needed
  // if (!res.ok) {
  //   throw new Error("Could not fetch redirects JSON");
  // }

  // const redirects = await res.json();
  return (
    <div className="nft">
      {children}

      <PreviewBackground redirects={posts as Collection[]} />
    </div>
  );
}
