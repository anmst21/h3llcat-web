import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { apiUri } from "@/helpers/uris";
import { truncateEthAddress } from "@/helpers/truncateAddress";

export const dynamic = "force-dynamic";

const temporaryUri =
  "https://f8n-production-collection-assets.imgix.net/rodeo/8453/0x7E383ECc3C0D70578528c51B6E51037fa2D157b8/13/Qman6xMqNh9WrDbrmTLihSHxh5Apnr9hJPatp5im6hzuHz/nft.jpeg";

// Image metadata
export const alt = "Preview Display";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { nft: string; address: string };
}) {
  const { nft: postId, address: collectionAddress } = params;
  // 1) Load your background image
  const nftOgBuffer = await readFile(
    join(process.cwd(), "public/opengraph/nft-og.jpg")
  );

  const nftOgArrayBuffer = Uint8Array.from(nftOgBuffer).buffer;

  const url = new URL(`${apiUri}/anonymous/rodeo/post`);
  url.searchParams.set("collectionAddress", collectionAddress);
  url.searchParams.set("tokenId", postId);

  const res = await fetch(url.toString(), {
    method: "GET",
  });

  const data = await res.json();

  const {
    image: {
      name,
      // category, ipfsCid, mimeType, blurhash
    },
    //  collection: { contractAddress, tokenId, creatorAddress },
  } = data.post;

  // 3) Load all SF Pro font weights
  const [sfProRegular, sfProMedium, sfProSemibold, sfProBold] =
    await Promise.all([
      readFile(join(process.cwd(), "src/app/fonts/SFProText-Regular.ttf")),
      readFile(join(process.cwd(), "src/app/fonts/SFProText-Medium.ttf")),
      readFile(join(process.cwd(), "src/app/fonts/SFProText-Semibold.ttf")),
      readFile(join(process.cwd(), "src/app/fonts/SFProText-Bold.ttf")),
    ]);

  const headerStyle = {
    color: "rgba(255, 255, 255, 0.80)",
    fontFamily: "SFProText",
    fontSize: 24,
    fontWeight: 700,
  };

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex", // allow multiple children
          width: "100%",
          height: "100%",
          fontFamily: "SFProText", // matches our loaded font name
          backgroundColor: "#050915",
        }}
      >
        {/* 1) Background image */}
        <img
          src={nftOgArrayBuffer as unknown as string} // ArrayBuffer from your JPEG
          width={size.width}
          height={size.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          style={{
            marginTop: 42,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: 785,
            height: 550,
            marginLeft: 207.5,
            marginRight: 207.5,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              marginLeft: 20,
              marginTop: 20,
              gap: 5,
              zIndex: 1000,
            }}
          >
            <div style={headerStyle}>COLLECTION</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 62,
                color: "white",
              }}
            >
              {truncateEthAddress(collectionAddress).toUpperCase()}
            </div>
          </div>
          <div
            style={{
              marginTop: "auto",
              paddingRight: 20,
              position: "relative",
              display: "flex",
              //  marginTop: "auto",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 5,
            }}
          >
            <div style={headerStyle}>NAME</div>
            <span
              style={{
                fontWeight: 400,
                color: "white",
                fontSize: 32,
                textAlign: "right",
                width: 484,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {name}
              <span style={{ color: "#FC0" }}>DISPLAY</span>
            </span>
          </div>
        </div>
        <img
          src={temporaryUri} // ArrayBuffer from your JPEG
          width={237}
          height={237}
          style={{
            position: "absolute",
            zIndex: 10,
            border: "2px solid #FDFDFD",
            left: 291,
            bottom: 135,
            borderRadius: 30,
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SFProText", data: sfProRegular, style: "normal", weight: 400 },
        { name: "SFProText", data: sfProMedium, style: "normal", weight: 500 },
        {
          name: "SFProText",
          data: sfProSemibold,
          style: "normal",
          weight: 600,
        },
        { name: "SFProText", data: sfProBold, style: "normal", weight: 700 },
      ],
    }
  );
}
