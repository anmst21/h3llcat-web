import PageHeader from "@/components/page-header";

export default function ContactsPage() {
  return (
    <div className="contacts-page">
      <PageHeader
        isWhite
        btnContent="Go to BETA"
        href="/beta"
        subHeader="Mint your Beta Pass NFT to unlock early access, exclusive features, and the future of on-chain minting"
        text={["stay in", "touch with", "team display"]}
      />
    </div>
  );
}
