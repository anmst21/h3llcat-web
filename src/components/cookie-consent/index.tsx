"use client";

import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ConsentBtn from "./consent-btn";
import { ConsentCross } from "../icon";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsentBanner = () => {
  const cookieValue = getCookieConsentValue("cookieConsentDisplay");
  const [showModal, setShowModal] = useState(!cookieValue ? true : false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoaded && showModal && (
          <>
            <div onClick={closeModal} className="consent-overlay" />
            <motion.div
              initial={{ x: 600 }} // Start 300px to the right
              animate={{ x: 0 }} // Animate to its natural position
              transition={{ duration: 0.3 }}
              exit={{ x: 600 }}
              className="cookie-consent__container"
            >
              <CookieConsent
                onOverlayClick={closeModal}
                cookieName="cookieConsentDisplay"
                onAccept={() => setShowModal(false)}
                onDecline={() => setShowModal(false)}
                buttonClasses="accept-cookie"
                declineButtonClasses="decline-cookie"
                location="bottom"
                buttonText="Accept All"
                disableStyles
                ButtonComponent={(props: any) => (
                  <ConsentBtn callback={closeModal} {...props} />
                )}
                buttonWrapperClasses="consent-btn-wrapper"
                containerClasses="cookie-consent"
                contentClasses="consent-text"
                declineButtonText="Decline"
                enableDeclineButton
                expires={365}
              >
                <h4>We Value Your Privacy!</h4>
                <span>
                  Our website uses cookies and similar technologies to
                  personalize content and analyze traffic.
                </span>
                <span>
                  Please review our <Link href="/privacy">Privacy Policy</Link>{" "}
                  to learn more about the data we collect, or close this message
                  to continue.
                </span>
              </CookieConsent>
              <button
                className="consent-cross"
                onClick={() => setShowModal(false)}
              >
                <ConsentCross />
                <ConsentCross />
                <ConsentCross />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsentBanner;
