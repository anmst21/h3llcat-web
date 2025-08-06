import React, { useEffect, useState } from "react";

import { PlayerDownload, PlayerVideo, PlayerPoster } from "../icon";
import { createPortal } from "react-dom";

import { motion } from "motion/react";

const VideoPlayerMenu = ({
  onClose,
  onMouseMove,
}: {
  onClose: () => void;
  onMouseMove: () => void;
}) => {
  const downloadVideo = () => {
    // derive a filename (fallback to video.mp4)
    const fileName = "beta-pass.mp4";
    // create and click an <a download>
    const link = document.createElement("a");
    link.href = "/beta-video-main-compressed.mp4";
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const buttonProps = [
    {
      id: 1,
      value: "Open original poster",
      icon: <PlayerPoster />,
      callback: () =>
        window.open("/beta-pass-cover.jpg", "_blank", "noopener,noreferrer"),
    },
    {
      id: 2,
      value: "Open original video",
      icon: <PlayerVideo />,
      callback: () =>
        window.open(
          "/beta-video-main-compressed.mp4",
          "_blank",
          "noopener,noreferrer"
        ),
    },
    {
      id: 3,
      value: "Download Video",
      icon: <PlayerDownload />,
      callback: () => downloadVideo(),
    },
  ];

  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".video-player__top");
    setPortalContainer(el);
  }, []);

  useEffect(() => {
    if (!portalContainer) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!portalContainer.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [portalContainer, onClose]);

  return portalContainer
    ? createPortal(
        <motion.div
          onMouseMove={onMouseMove}
          key="video-dropdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="video-player-menu"
        >
          <div className="video-player-menu__filter">
            {buttonProps.map((button, i) => {
              return (
                <div className="video-player-menu__item" key={i}>
                  <button
                    className="video-player-menu__button"
                    onClick={button.callback}
                    key={i}
                  >
                    <span>{button.value}</span>
                    {button.icon}
                  </button>
                  {button.id !== 3 && <div className="video-divider" />}
                </div>
              );
            })}
          </div>
        </motion.div>,
        portalContainer
      )
    : null;
};

export default VideoPlayerMenu;
