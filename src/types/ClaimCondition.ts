export interface ClaimCondition {
  startTimestamp: bigint;
  maxClaimableSupply: bigint;
  supplyClaimed: bigint;
  quantityLimitPerWallet: bigint;
  merkleRoot: string; // fixed-length hex string
  pricePerToken: bigint;
  currency: string; // Ethereum address or native token sentinel
  metadata: string; // IPFS or HTTP URI
}

/** JSON-safe version for passing across the RSC → client boundary */
export interface SerializedClaimCondition {
  startTimestamp: string;
  maxClaimableSupply: string;
  supplyClaimed: string;
  quantityLimitPerWallet: string;
  merkleRoot: string;
  pricePerToken: string;
  currency: string;
  metadata: string;
}
