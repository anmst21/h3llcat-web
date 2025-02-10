import { useEffect } from "react";

export function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    if (lock) {
      // Record the current scroll position
      const scrollY = window.scrollY;
      // Lock the body scroll and offset the top so that the view doesn't jump
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Cleanup function: unlock and restore scroll position
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
    // If lock is false, ensure that no styles linger
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [lock]);
}
