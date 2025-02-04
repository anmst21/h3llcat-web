import Image from "next/image";
import QRCode from "./qr-code";
export default function QRFooter({
  uri,
  sqSize,
}: {
  uri: string;
  sqSize: number;
}) {
  return (
    <div className="qr-footer">
      <div className="qr-footer__logo">
        <Image
          width={50}
          height={50}
          src={"/logo-display.svg"}
          alt="logo-footer"
        />
        <div className="qr-footer__logo__text">
          <span className="qr-footer__logo__text__top">View on Display</span>
          <span className="qr-footer__logo__text__bot">
            Scan QR code to open link in app
          </span>
        </div>
      </div>

      <QRCode sqSize={sqSize} uri={uri} />
    </div>
  );
}
