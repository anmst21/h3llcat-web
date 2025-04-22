// src/app/api/collection/[address]/og/route.tsx
import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { apiUri } from "@/helpers/uris";
import { truncateEthAddress } from "@/helpers/truncateAddress";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const size = {
  width: 1200,
  height: 630,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const address = params.address;

  // 1) Load your background + logo
  const [bgBuffer, logoBuffer] = await Promise.all([
    readFile(join(process.cwd(), "public/opengraph/collection-og.jpg")),
    readFile(join(process.cwd(), "public/opengraph/collection-og-logo.jpg")),
  ]);
  const bgArrayBuffer = Uint8Array.from(bgBuffer).buffer;
  const logoArrayBuffer = Uint8Array.from(logoBuffer).buffer;

  // 2) Fetch your posts
  const url = new URL(`${apiUri}/anonymous/rodeo/collection/posts`);
  url.searchParams.set("collectionAddress", address);
  url.searchParams.set("limit", "8");
  url.searchParams.set("offset", "0");

  const res = await fetch(url.toString());
  if (!res.ok) {
    return new Response("Failed to fetch posts", { status: 502 });
  }
  const response = (await res.json()) as {
    collection: { creatorAddress: string; contractAddress: string };
    posts: any[];
  };

  // 3) Load your SF Pro fonts
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
        <div
          style={{
            display: "flex",
            backgroundColor: "#050915",
            position: "absolute",
            width: 785,
            height: 270,
            top: 165,
            left: 207,
          }}
        >
          <img
            src={logoArrayBuffer as unknown as string} // ArrayBuffer from your JPEG
            width={785}
            height={270}
            style={{
              position: "absolute",
              bottom: -14,
              right: 0,
              // objectFit: "cover",
              // width: "100%",
              // height: "100%",
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              height: 266,
              width: 541,
              gap: 7,
              left: -12,
              transform: "skewX(-20deg)",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 7,
                top: -60,
              }}
            >
              <img
                alt=""
                src={
                  "https://f8n-production-collection-assets.imgix.net/rodeo/8453/0xf4321e45d6bFa225250fCa8728667cB31D4Ad45f/570/QmZN5KdtbJhe6jjakbr2FTm58mqYHzxeZarfxjSBDPaPpT/nft.jpeg"
                } // ArrayBuffer from your JPEG
                width={167}
                height={200}
                style={{
                  borderRadius: 25,
                }}
              />
              <img
                alt=""
                src={
                  "https://f8n-production-collection-assets.imgix.net/rodeo/8453/0xA95AD2EC9d387b2967324363D0B580732D76228d/108/QmQx9vC8L1NGKbeshpBErS6QWpFQFAvCfQUaJTYDwYRVhg/nft.jpeg"
                } // ArrayBuffer from your JPEG
                width={167}
                height={200}
                style={{
                  borderRadius: "25px 60px",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 7,
                top: -117,
              }}
            >
              <img
                alt=""
                src={
                  "https://f8n-production-collection-assets.imgix.net/rodeo/8453/0xf4321e45d6bFa225250fCa8728667cB31D4Ad45f/572/QmTJAbZ8voxMz4WS8UYeh6WTagaqrFPLpNDn9DRsbwFFGs/nft.jpeg"
                }
                width={167}
                height={200}
                style={{
                  borderRadius: 25,
                }}
              />
              <img
                alt=""
                src={
                  "https://f8n-production-collection-assets.imgix.net/rodeo/8453/0xd8411755B7D7815B5aB5A4940544F9aB9257adfb/30/QmdgwHi9o6kS2PSzraawz9YHsuU8gD9YcZBA2T3YQjTVV6/nft.jpeg"
                }
                width={167}
                height={200}
                style={{
                  borderRadius: "25px 60px",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 7,
                top: -20,
              }}
            >
              <img
                alt=""
                src={
                  "https://f8n-production-collection-assets.imgix.net/rodeo/8453/0xFDb366d49f35f1eB3570F08EfEDE2f2c609a457D/1/QmRpEt3yFdsJhMWyz79UA4ygdy5qL6H1yEJPQ6vZbiEJKD/nft.jpeg"
                }
                width={167}
                height={200}
                style={{
                  borderRadius: 25,
                }}
              />
              <img
                alt=""
                src={
                  "https://f8n-production-collection-assets.imgix.net/rodeo/8453/0xB68956773937D131FEdf6BF9af7087C0f9777F89/56/QmPJ2QSNBnrCxs1HgFrjckMe4iC6Rt4wikj9G7pvmHUU9t/nft.jpeg"
                }
                width={167}
                height={200}
                style={{
                  borderRadius: "25px 60px",
                }}
              />
            </div>
          </div>
        </div>
        <img
          src={bgArrayBuffer as unknown as string}
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
            <div style={headerStyle}>CREATOR</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 62,
                color: "white",
              }}
            >
              {truncateEthAddress(
                response.collection.creatorAddress
              ).toUpperCase()}
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
            <div style={headerStyle}>ENTER NOW</div>
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
              Ready to collect? Jump into
              <span style={{ color: "#FC0" }}>DISPLAY</span>
            </span>
          </div>
        </div>
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
