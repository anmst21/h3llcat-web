import { ImageResponse } from "next/og";
import Img from "next/image";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { apiUri, gateway } from "@/helpers/uris";
import { RodeoPost } from "@/components/app-redirect/types";
import { truncateEthAddress } from "@/helpers/truncateAddress";

export const config = { runtime: "edge" };

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
  params: { address: string };
}) {
  // 1) Load your background image
  const bgBuffer = await readFile(
    join(process.cwd(), "public/opengraph/collection-og.jpg")
  );
  const bgArrayBuffer = Uint8Array.from(bgBuffer).buffer;

  // 2) Fetch your posts (unchanged)
  const url = new URL(`${apiUri}/anonymous/rodeo/collection/posts`);
  url.searchParams.set("collectionAddress", params.address);
  url.searchParams.set("limit", "8");
  url.searchParams.set("offset", "0");

  const res = await fetch(url.toString());
  if (!res.ok) return;
  const response = (await res.json()) as {
    collection: { creatorAddress: string; contractAddress: string };
    posts: RodeoPost[];
  };
  const slicedPosts = response.posts.slice(0, 6);
  const images = slicedPosts.map((post) => {
    const hash = post.image.ipfsCid.split("ipfs://")[1];
    return {
      url: `${gateway}/${hash}_Sm.webp`,
      width: post.image.width,
      height: post.image.height,
    };
  });

  //   const inlined = await Promise.all(
  //     slicedPosts.map(async (post) => {
  //       const hash = post.image.ipfsCid.split("ipfs://")[1];

  //       // build the local convert URL
  //       const apiPath = `/api/convert/${hash}`;
  //       const fullUrl = new URL(apiPath, origin).toString();

  //       // fetch‐and‐cache your PNG proxy
  //       const buf = await fetch(fullUrl, {
  //         next: { revalidate: 60 * 60 * 24 }, // 24h cache
  //       }).then((r) => r.arrayBuffer());

  //       return {
  //         url: fullUrl, // <-- points at /api/convert/<hash>
  //         src: buf, // <-- raw PNG bytes
  //         width: post.image.width,
  //         height: post.image.height,
  //       };
  //     })
  //   );

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
        }}
      >
        {/* 1) Background image */}
        <img
          src={bgArrayBuffer as unknown as string} // ArrayBuffer from your JPEG
          width={size.width}
          height={size.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />

        <div
          style={{
            marginTop: 42,
            position: "relative",
            //   zIndex: 1,
            display: "flex",
            flexDirection: "column",

            //     justifyContent: "center",
            width: 785,
            height: 550,
            // example styling:

            // padding: 20,
            overflow: "hidden",
            marginLeft: 207.5,
            marginRight: 207.5,
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
              display: "flex",
              backgroundColor: "blue",
              position: "relative",
              transformOrigin: "top left",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                overflow: "hidden", // ← hide anything outside

                // backgroundColor: "red",
                height: 266,
                width: 541,
                marginTop: 12,
                marginLeft: 2,
                gap: 7,
                left: -20,
                transform: "skewX(-20deg)",

                backgroundColor: "red",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  //    transform: "skewX(-20deg)",
                  gap: 7,
                  top: -60,
                }}
              >
                <img
                  alt=""
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/960px-Cat_August_2010-4.jpg"
                  } // ArrayBuffer from your JPEG
                  width={167}
                  height={200}
                  style={{
                    borderRadius: 25,

                    backgroundColor: "blue",
                  }}
                />
                <img
                  alt=""
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/960px-Cat_August_2010-4.jpg"
                  } // ArrayBuffer from your JPEG
                  width={167}
                  height={200}
                  style={{
                    borderRadius: "25px 60px",

                    backgroundColor: "blue",
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  // transform: "skewX(-20deg)",
                  gap: 7,
                  top: -117,
                }}
              >
                <img
                  alt=""
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/960px-Cat_August_2010-4.jpg"
                  } // ArrayBuffer from your JPEG
                  width={167}
                  height={200}
                  style={{
                    borderRadius: 25,

                    backgroundColor: "blue",
                  }}
                />
                <img
                  alt=""
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/960px-Cat_August_2010-4.jpg"
                  } // ArrayBuffer from your JPEG
                  width={167}
                  height={200}
                  style={{
                    borderRadius: "25px 60px",

                    backgroundColor: "blue",
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  // transform: "skewX(-20deg)",
                  gap: 7,
                  top: -20,
                }}
              >
                <img
                  alt=""
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/960px-Cat_August_2010-4.jpg"
                  } // ArrayBuffer from your JPEG
                  width={167}
                  height={200}
                  style={{
                    borderRadius: 25,

                    backgroundColor: "blue",
                  }}
                />
                <img
                  alt=""
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/960px-Cat_August_2010-4.jpg"
                  } // ArrayBuffer from your JPEG
                  width={167}
                  height={200}
                  style={{
                    borderRadius: "25px 60px",

                    backgroundColor: "blue",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
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

{
  /* <div
          style={{
            position: "relative",
            //   zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            // example styling:
            color: "white",
            fontSize: 72,
            padding: 40,
            textAlign: "center",
          }}
        >
          About Acme
        </div> */
}

<svg
  width="541"
  height="266"
  viewBox="0 0 541 266"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <g clip-path="url(#clip0_7900_7425)">
    <path
      d="M306.616 197.154C299.833 204.211 296.047 214.132 288.476 233.975L274.669 270.165C259.784 309.176 252.342 328.682 256.769 344.134C258.958 351.773 262.989 358.713 268.459 364.365C270.127 361.907 272.222 359.49 274.74 357.132C287.232 345.438 309.326 335.985 337.047 330.474C364.304 325.055 395.243 323.796 424.472 326.906L431.277 309.071L438.081 291.236C452.966 252.224 460.408 232.719 455.981 217.267C453.097 207.201 447.014 198.35 438.655 192.058C425.825 182.401 404.976 182.401 363.279 182.401C342.07 182.401 331.465 182.401 322.462 186.228C316.499 188.764 311.109 192.48 306.616 197.154Z"
      fill="url(#pattern0_7900_7425)"
    />
    <path
      d="M422.434 332.24C395.79 329.285 367.489 330.378 342.6 335.326C317.651 340.286 297.767 348.794 286.524 359.319C282.27 363.302 279.358 367.475 277.808 371.722C277.805 371.729 277.803 371.736 277.8 371.743C277.888 371.791 277.975 371.84 278.064 371.887C291.163 379 311.816 379 349.471 379C370.68 379 381.285 379 390.288 375.172C396.251 372.637 401.641 368.921 406.134 364.247C412.345 357.786 416.043 348.922 422.434 332.24Z"
      fill="url(#pattern1_7900_7425)"
    />
    <path
      d="M274.74 357.132C272.222 359.49 270.127 361.907 268.459 364.365C270.591 366.767 275.421 370.164 277.808 371.722C279.358 367.475 282.27 363.302 286.524 359.319C297.767 348.794 317.651 340.286 342.6 335.326C367.489 330.378 395.79 329.285 422.434 332.24L424.472 326.906C395.243 323.796 364.304 325.055 337.047 330.474C309.326 335.985 287.232 345.438 274.74 357.132Z"
      fill="url(#pattern2_7900_7425)"
    />
    <path
      d="M160.926 101.106C154.168 108.162 150.397 118.084 142.854 137.927L129.097 174.116C114.268 213.128 106.853 232.634 111.264 248.085C113.445 255.725 117.461 262.664 122.911 268.316C124.573 265.859 126.66 263.441 129.169 261.084C141.614 249.389 163.626 239.936 191.244 234.425C218.399 229.006 249.223 227.748 278.344 230.857L285.123 213.022L291.903 195.188C306.732 156.176 314.147 136.67 309.736 121.219C306.863 111.152 300.802 102.302 292.474 96.01C279.692 86.3525 258.921 86.3525 217.378 86.3525C196.248 86.3525 185.683 86.3525 176.713 90.18C170.772 92.7153 165.403 96.4315 160.926 101.106Z"
      fill="url(#pattern3_7900_7425)"
    />
    <path
      d="M276.314 236.192C249.769 233.236 221.573 234.33 196.776 239.278C171.92 244.238 152.11 252.746 140.909 263.271C136.67 267.253 133.769 271.426 132.225 275.673C132.222 275.681 132.22 275.688 132.217 275.695C132.304 275.743 132.392 275.791 132.48 275.839C145.53 282.952 166.106 282.952 203.622 282.952C224.752 282.952 235.317 282.952 244.286 279.124C250.227 276.589 255.597 272.873 260.074 268.199C266.262 261.737 269.946 252.874 276.314 236.192Z"
      fill="url(#pattern4_7900_7425)"
    />
    <path
      d="M129.169 261.084C126.66 263.441 124.573 265.859 122.911 268.316C125.034 270.719 129.847 274.116 132.225 275.673C133.769 271.426 136.67 267.253 140.909 263.271C152.11 252.746 171.92 244.238 196.776 239.278C221.573 234.33 249.769 233.236 276.314 236.192L278.344 230.857C249.223 227.748 218.399 229.006 191.244 234.425C163.626 239.936 141.614 249.389 129.169 261.084Z"
      fill="url(#pattern5_7900_7425)"
    />
    <path
      d="M-39.8839 158.078C-46.6672 165.108 -50.4527 174.991 -58.0237 194.759L-71.8314 230.81C-86.716 269.673 -94.1583 289.104 -89.7313 304.497C-87.5424 312.107 -83.5112 319.02 -78.041 324.651C-76.3728 322.202 -74.2781 319.794 -71.7599 317.446C-59.2679 305.796 -37.1744 296.379 -9.45334 290.889C17.8037 285.491 48.7425 284.237 77.9721 287.334L84.7767 269.568L91.5814 251.801C106.466 212.938 113.908 193.507 109.481 178.114C106.597 168.086 100.514 159.27 92.1552 153.002C79.3249 143.381 58.4762 143.381 16.7789 143.381C-4.43031 143.381 -15.0349 143.381 -24.0376 147.194C-30.0007 149.72 -35.3908 153.422 -39.8839 158.078Z"
      fill="url(#pattern6_7900_7425)"
    />
    <path
      d="M75.9342 292.649C49.2901 289.704 20.9894 290.794 -3.90018 295.723C-28.8491 300.664 -48.7332 309.139 -59.9761 319.624C-64.2305 323.592 -67.1418 327.749 -68.692 331.98C-68.6946 331.987 -68.6972 331.994 -68.6998 332.001C-68.6123 332.049 -68.5246 332.097 -68.4365 332.145C-55.3372 339.23 -34.6844 339.23 2.97111 339.23C24.1803 339.23 34.7848 339.23 43.7875 335.417C49.7507 332.892 55.1407 329.189 59.6339 324.533C65.8449 318.097 69.5426 309.267 75.9342 292.649Z"
      fill="url(#pattern7_7900_7425)"
    />
    <path
      d="M-71.7599 317.446C-74.2781 319.794 -76.3728 322.202 -78.041 324.651C-75.9094 327.044 -71.0793 330.428 -68.692 331.98C-67.1418 327.749 -64.2305 323.592 -59.9761 319.624C-48.7332 309.139 -28.8491 300.664 -3.90018 295.723C20.9894 290.794 49.2901 289.704 75.9342 292.649L77.9721 287.334C48.7425 284.237 17.8037 285.491 -9.45334 290.889C-37.1744 296.379 -59.2679 305.796 -71.7599 317.446Z"
      fill="url(#pattern8_7900_7425)"
    />
    <path
      d="M370.825 12.1092C376.879 -3.88515 379.906 -11.8823 386.476 -16.417C393.047 -20.9516 401.607 -20.9516 418.727 -20.9516H480.468C514.125 -20.9516 530.953 -20.9516 538.588 -9.91641C546.224 1.11877 540.273 16.8402 528.371 48.2831L492.675 142.587C486.621 158.581 483.594 166.578 477.024 171.113C470.453 175.647 461.893 175.647 444.772 175.647H444.439C444.688 168.715 441.697 161.775 435.489 155.224C425.119 144.283 406.4 135.091 382.304 129.033L388.008 126.949L375.249 123.317L374.765 110.074L367.363 121.072L354.603 117.439L362.788 127.869L355.386 138.866L367.847 134.314L376.031 144.744L375.625 133.612C397.317 139.064 414.168 147.338 423.502 157.186C429.114 163.107 431.804 169.382 431.554 175.647H383.032C349.375 175.647 332.547 175.647 324.911 164.612C317.276 153.577 323.227 137.856 335.129 106.413L370.825 12.1092Z"
      fill="url(#pattern9_7900_7425)"
    />
    <path
      d="M444.439 175.647C444.688 168.715 441.697 161.775 435.489 155.224C425.119 144.283 406.4 135.091 382.304 129.033L388.008 126.949L375.249 123.317L374.765 110.074L367.363 121.072L354.603 117.439L362.788 127.869L355.386 138.866L367.847 134.314L376.031 144.744L375.625 133.612C397.317 139.064 414.168 147.338 423.502 157.186C429.114 163.107 431.804 169.382 431.554 175.647H444.439Z"
      fill="url(#pattern10_7900_7425)"
    />
    <path
      d="M223.992 -83.9392C230.067 -99.9335 233.105 -107.931 239.697 -112.465C246.29 -117 254.879 -117 272.058 -117H334.009C367.78 -117 384.666 -117 392.327 -105.965C399.988 -94.9296 394.017 -79.2082 382.075 -47.7654L346.257 46.5383C340.183 62.5326 337.145 70.5298 330.553 75.0645C323.96 79.5991 315.371 79.5991 298.192 79.5991H297.857C298.107 72.6668 295.106 65.7263 288.876 59.1755C278.472 48.2344 259.689 39.0428 235.511 32.9848L241.234 30.901L228.431 27.2684L227.946 14.026L220.519 25.0234L207.716 21.3909L215.928 31.8202L208.501 42.8176L221.004 38.2659L229.217 48.6952L228.809 37.5635C250.575 43.0157 267.483 51.2893 276.849 61.1379C282.48 67.0588 285.179 73.3335 284.929 79.5991H236.241C202.47 79.5991 185.584 79.5991 177.923 68.5639C170.262 57.5287 176.233 41.8073 188.175 10.3644L223.992 -83.9392Z"
      fill="url(#pattern11_7900_7425)"
    />
    <path
      d="M297.857 79.5991C298.107 72.6668 295.106 65.7263 288.876 59.1755C278.472 48.2344 259.689 39.0428 235.511 32.9848L241.234 30.901L228.431 27.2684L227.946 14.026L220.519 25.0234L207.716 21.3909L215.928 31.8202L208.501 42.8176L221.004 38.2659L229.217 48.6952L228.809 37.5635C250.575 43.0157 267.483 51.2893 276.849 61.1379C282.48 67.0588 285.179 73.3335 284.929 79.5991H297.857Z"
      fill="url(#pattern12_7900_7425)"
    />
    <path
      d="M24.4924 -27.5346C30.5672 -43.59 33.6046 -51.6177 40.1973 -56.1697C46.79 -60.7216 55.3794 -60.7216 72.5581 -60.7216H134.509C168.28 -60.7216 185.166 -60.7216 192.827 -49.6443C200.488 -38.567 194.517 -22.7856 182.575 8.77729L146.757 103.441C140.683 119.496 137.645 127.524 131.053 132.076C124.46 136.628 115.871 136.628 98.6918 136.628H98.3568C98.6065 129.669 95.6061 122.702 89.3765 116.126C78.9719 105.143 60.1892 95.9168 36.0105 89.8356L41.7343 87.7439L28.9313 84.0975L28.4458 70.8045L21.0187 81.8439L8.21573 78.1975L16.4284 88.6666L9.00128 99.706L21.5042 95.1369L29.7169 105.606L29.3088 94.4318C51.0749 99.9049 67.9835 108.21 77.3492 118.096C82.9798 124.04 85.6793 130.338 85.4285 136.628H36.741C2.9698 136.628 -13.9158 136.628 -21.5769 125.551C-29.238 114.473 -23.2669 98.6918 -11.3247 67.129L24.4924 -27.5346Z"
      fill="url(#pattern13_7900_7425)"
    />
    <path
      d="M98.3568 136.628C98.6065 129.669 95.6061 122.702 89.3765 116.126C78.9719 105.143 60.1892 95.9168 36.0105 89.8356L41.7343 87.7439L28.9313 84.0975L28.4458 70.8045L21.0187 81.8439L8.21573 78.1975L16.4284 88.6666L9.00128 99.706L21.5042 95.1369L29.7169 105.606L29.3088 94.4318C51.0749 99.9049 67.9835 108.21 77.3492 118.096C82.9798 124.04 85.6793 130.338 85.4285 136.628H98.3568Z"
      fill="url(#pattern14_7900_7425)"
    />
  </g>
  <defs>
    <pattern
      id="pattern0_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image0_7900_7425"
        transform="matrix(0.0013459 0 0 0.00138116 0 -0.0131)"
      />
    </pattern>
    <pattern
      id="pattern1_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image0_7900_7425"
        transform="matrix(0.0013459 0 0 0.00138116 0 -0.0131)"
      />
    </pattern>
    <pattern
      id="pattern2_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image0_7900_7425"
        transform="matrix(0.0013459 0 0 0.00138116 0 -0.0131)"
      />
    </pattern>
    <pattern
      id="pattern3_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image1_7900_7425"
        transform="matrix(0.00149925 0 0 0.00153281 0 -0.266406)"
      />
    </pattern>
    <pattern
      id="pattern4_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image1_7900_7425"
        transform="matrix(0.00149925 0 0 0.00153281 0 -0.266406)"
      />
    </pattern>
    <pattern
      id="pattern5_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image1_7900_7425"
        transform="matrix(0.00149925 0 0 0.00153281 0 -0.266406)"
      />
    </pattern>
    <pattern
      id="pattern6_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image2_7900_7425"
        transform="matrix(0.000925926 0 0 0.000953826 0 -0.143832)"
      />
    </pattern>
    <pattern
      id="pattern7_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image2_7900_7425"
        transform="matrix(0.000925926 0 0 0.000953826 0 -0.143832)"
      />
    </pattern>
    <pattern
      id="pattern8_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image2_7900_7425"
        transform="matrix(0.000925926 0 0 0.000953826 0 -0.143832)"
      />
    </pattern>
    <pattern
      id="pattern9_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image3_7900_7425"
        transform="matrix(0.000294843 0 0 0.000330688 -0.094404 0)"
      />
    </pattern>
    <pattern
      id="pattern10_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image3_7900_7425"
        transform="matrix(0.000294843 0 0 0.000330688 -0.094404 0)"
      />
    </pattern>
    <pattern
      id="pattern11_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image4_7900_7425"
        transform="matrix(0.000925926 0 0 0.00104202 0 -0.200241)"
      />
    </pattern>
    <pattern
      id="pattern12_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image4_7900_7425"
        transform="matrix(0.000925926 0 0 0.00104202 0 -0.200241)"
      />
    </pattern>
    <pattern
      id="pattern13_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image5_7900_7425"
        transform="matrix(0.000925926 0 0 0.00103806 0 -0.200692)"
      />
    </pattern>
    <pattern
      id="pattern14_7900_7425"
      patternContentUnits="objectBoundingBox"
      width="1"
      height="1"
    >
      <use
        xlinkHref="#image5_7900_7425"
        transform="matrix(0.000925926 0 0 0.00103806 0 -0.200692)"
      />
    </pattern>
    <clipPath id="clip0_7900_7425">
      <rect width="541" height="266" fill="white" />
    </clipPath>
    <image
      id="image0_7900_7425"
      width="743"
      height="743"
      preserveAspectRatio="none"
      xlinkHref=""
    />
    <image
      id="image1_7900_7425"
      width="667"
      height="1000"
      preserveAspectRatio="none"
      xlinkHref=""
    />
    <image
      id="image2_7900_7425"
      width="1080"
      height="1350"
      preserveAspectRatio="none"
      xlinkHref=""
    />
    <image
      id="image3_7900_7425"
      width="4032"
      height="3024"
      preserveAspectRatio="none"
      xlinkHref=""
    />
    <image
      id="image4_7900_7425"
      width="1080"
      height="1344"
      preserveAspectRatio="none"
      xlinkHref=""
    />
    <image
      id="image5_7900_7425"
      width="1080"
      height="1350"
      preserveAspectRatio="none"
      xlinkHref=""
    />
  </defs>
</svg>;
