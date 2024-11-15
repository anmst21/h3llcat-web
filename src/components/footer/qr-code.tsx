"use server";

import QRCode from "qrcode";
import { QrLogo, QrSq } from "../icon";

function generateQRCodeData(text: string) {
  // Generate QR code data
  const qrCodeData = QRCode.create(text);
  return Array.from(qrCodeData.modules.data); // Convert to regular array
}

interface ShowCodeProps {
  uri: string;
}

const ShowCode: React.FC<ShowCodeProps> = ({ uri }) => {
  const reservedBit = generateQRCodeData(uri);
  const size = 100 - 14;

  // Calculate grid dimension (e.g., 21x21 for QR codes with low error correction and version 1)
  const dimension = Math.sqrt(reservedBit.length);

  // Calculate the size of each cell in the grid
  const cellSize = size / dimension;
  const radius = cellSize / 4; // Adjust radius slightly to avoid overlap

  // Define the size of the corner areas to skip (7x7 grid)
  const cornerSize = 7;

  return (
    <div className="footer__code">
      <div style={{ position: "relative", display: "flex" }}>
        <div className="sq-top-left">
          <QrSq />
        </div>
        <div className="sq-bot-left">
          <QrSq />
        </div>
        <div className="sq-top-right">
          <QrSq />
        </div>
        <svg
          style={{ borderRadius: 3 }}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {reservedBit.map((bit, index) => {
            const row = Math.floor(index / dimension);
            const col = index % dimension;

            // Skip dots in the top-left, top-right, and bottom-left corner regions
            const isInTopLeftCorner = row < cornerSize && col < cornerSize;
            const isInTopRightCorner =
              row < cornerSize && col >= dimension - cornerSize;
            const isInBottomLeftCorner =
              row >= dimension - cornerSize && col < cornerSize;

            if (
              isInTopLeftCorner ||
              isInTopRightCorner ||
              isInBottomLeftCorner
            ) {
              return null; // Skip rendering this circle
            }

            // Calculate center position for each circle within its cell
            const cx = col * cellSize + cellSize / 2;
            const cy = row * cellSize + cellSize / 2;

            // Draw a circle for each '1' bit
            return bit === 1 ? (
              <circle key={index} cx={cx} cy={cy} r={radius} fill="#FC0" />
            ) : null;
          })}
        </svg>
      </div>
      <div
        className="center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <QrLogo />
      </div>
    </div>
  );
};

export default ShowCode;
