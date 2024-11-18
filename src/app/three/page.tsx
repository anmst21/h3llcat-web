import '@/components/three-scene/index.scss';
import ThreeScene from "@/components/three-scene";

export default async function Nft({}: {
  params: Promise<{ address: string }>;
}) {
  return (
    <div className="three_wrapper">
        <ThreeScene />
    </div>
  );
}
