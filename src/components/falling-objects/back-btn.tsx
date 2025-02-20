"use client";
import { useRouter } from "next/navigation";
import SubmitCta from "../button/submit-cta";

const BackBtn = () => {
  const router = useRouter();
  return (
    <div className="not-found__back">
      <SubmitCta back callback={() => router.back()} isSubmitting={false} />
    </div>
  );
};

export default BackBtn;
