import Image from "next/image";
import image from "@/app/logo-display.svg";
import QRCode from "./qr-code";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <Image width={50} height={50} src={image} alt="logo-footer" />
        <div className="footer__logo__text">
          <span className="footer__logo__text__top">Get Display app</span>
          <span className="footer__logo__text__bot">
            Scan QR code to open link in app
          </span>
        </div>
      </div>

      <QRCode uri="http://localhost:3000/collection/0b9f682f-dd5a-4452-8e56-188e8cd585e0/59ecbd91-fd06-44b4-be63-58d46a698f96" />
    </div>
  );
}
