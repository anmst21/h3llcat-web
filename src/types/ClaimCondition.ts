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
