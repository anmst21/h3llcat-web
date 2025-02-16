// src/utils/verifySanitySignature.ts
import crypto from "crypto";

export interface VerificationResult {
  verified: boolean;
  error?: string;
}

/**
 * Verifies the Sanity webhook signature.
 *
 * @param rawBody - The raw request body as a string.
 * @param signatureHeader - The signature header from Sanity (format: "t=timestamp,v1=signature").
 * @param webhookSecret - Your Sanity webhook secret.
 * @returns An object with { verified: true } if valid, or { verified: false, error: "..." } if not.
 */
export function verifySanitySignature(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string
): VerificationResult {
  console.log("[verifySanitySignature] Signature header:", signatureHeader);

  let timestamp = "";
  let signature = "";
  signatureHeader.split(",").forEach((part) => {
    const [key, value] = part.split("=");
    if (key.trim() === "t") {
      timestamp = value.trim();
    } else if (key.trim() === "v1") {
      signature = value.trim();
    }
  });

  if (!timestamp || !signature) {
    console.error("[verifySanitySignature] Invalid signature header format");
    return { verified: false, error: "Invalid signature header format" };
  }

  // Construct the string to sign
  const stringToSign = `${timestamp}.${rawBody}`;
  console.log("[verifySanitySignature] String to sign:", stringToSign);

  // Compute the HMAC using SHA-256 with your Sanity webhook secret
  const hmac = crypto.createHmac("sha256", webhookSecret);
  hmac.update(stringToSign);

  // Compute the digest in Base64 (Sanity uses URL-safe Base64)
  const digestBase64 = hmac.digest("base64");
  console.log(
    "[verifySanitySignature] Computed digest (Base64):",
    digestBase64
  );

  // Convert the computed digest to URL-safe Base64 (remove padding and replace characters)
  const computedSignature = digestBase64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  console.log(
    "[verifySanitySignature] Computed signature (URL-safe):",
    computedSignature
  );

  // Convert the computed signature and provided signature into Buffers
  const computedBuffer = Buffer.from(computedSignature, "utf8");
  const providedBuffer = Buffer.from(signature, "utf8");

  // Create Uint8Array views from the Buffers for timingSafeEqual
  const computedArray = new Uint8Array(
    computedBuffer.buffer,
    computedBuffer.byteOffset,
    computedBuffer.byteLength
  );
  const providedArray = new Uint8Array(
    providedBuffer.buffer,
    providedBuffer.byteOffset,
    providedBuffer.byteLength
  );

  console.log(
    "[verifySanitySignature] Computed array length:",
    computedArray.length
  );
  console.log(
    "[verifySanitySignature] Provided array length:",
    providedArray.length
  );

  if (
    computedArray.length !== providedArray.length ||
    !crypto.timingSafeEqual(computedArray, providedArray)
  ) {
    console.error("[verifySanitySignature] Signature verification failed");
    console.log(
      "[verifySanitySignature] Computed signature:",
      computedSignature
    );
    console.log("[verifySanitySignature] Provided signature:", signature);
    return { verified: false, error: "Invalid signature" };
  }

  console.log("[verifySanitySignature] Signature verification succeeded");
  return { verified: true };
}
