import Image from "next/image";
import image from "@/app/logo-display.svg";

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
      <div className="footer__code"></div>
    </div>
  );
}
