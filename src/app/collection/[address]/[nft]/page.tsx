export default async function Nft({
  params,
}: {
  params: Promise<{ nft: string; address: string }>;
}) {
  const nft = (await params).nft;
  const address = (await params).address;

  return (
    <div className="nft__container">
      <div className="nft__card">
        <span className="nft__card__name">Citizen Sleeper</span>
      </div>
    </div>
  );
}
//   Hello!{nft} {address}
