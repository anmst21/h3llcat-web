import FallingObjects from "@/components/falling-objects";
import ScrollBtn from "@/components/falling-objects/scroll-btn";
import { Suspense } from "react";
import { LogoNotFound } from "@/components/icon";
import BackBtn from "@/components/falling-objects/back-btn";

export default function NotFound() {
  return (
    <>
      <div className="not-found__text">
        <LogoNotFound />
        <h1>Page Not Found</h1>
        <p>
          Oops, we can't seem to find the page you're looking for. It might have
          been moved or no longer exists.
        </p>
        <BackBtn />
      </div>
      <Suspense>
        <ScrollBtn />
      </Suspense>
      <FallingObjects />
    </>
  );
}
