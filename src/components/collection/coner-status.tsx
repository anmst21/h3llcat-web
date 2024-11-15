const CornerStatus = ({ status }: { status: "collection" | "nft" }) => {
  return (
    <div className="nft__corner__state">
      <span>{status.toUpperCase()}</span>
    </div>
  );
};

export default CornerStatus;
