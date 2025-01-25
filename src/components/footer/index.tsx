import Image from "next/image";
import QRCode from "./qr-code";
export default function Footer({
  uri,
  sqSize,
}: {
  uri: string;
  sqSize: number;
}) {
  return (
    <div className="footer">
      <div className="footer__logo">
        <Image
          width={50}
          height={50}
          src={"/logo-display.svg"}
          alt="logo-footer"
        />
        <div className="footer__logo__text">
          <span className="footer__logo__text__top">View on Display</span>
          <span className="footer__logo__text__bot">
            Scan QR code to open link in app
          </span>
        </div>
      </div>

      <QRCode sqSize={sqSize} uri={uri} />
    </div>
  );
}
