import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  PlayerFull,
  PlayerMenu,
  PlayerMute,
  PlayerPause,
  PlayerUnmute,
  PlayerPlay,
  PlayerPauseLg,
  PlayerPlayLg,
} from "../icon";

import ReactSlider from "react-slider";

import VideoPlayerMenu from "./video-player-menu";
import { AnimatePresence, motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

type Props = {
  name: string;
  uri: string;
};

const formatTime = (time: number) => {
  const s = time.toFixed();
  return `00:${Number(s) <= 9 ? "0" : ""}${s}`;
};

const TimeMarker = React.memo(({ time }: { time: number }) => (
  <div className="video-player__time__wrapper">
    <span className="video-player__time">
      00:
      <span>
        {Number(time.toFixed()) <= 9 && "0"}
        {time.toFixed()}
      </span>
    </span>
  </div>
));
TimeMarker.displayName = "TimeMarker";

const VideoPlayer = ({ name, uri }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [initialPlay, setInitialPlay] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showCta, setShowCta] = useState(true);
  const isSeeking = useRef(false);

  const [volume, setVolume] = useState(1); // <- track 0–1

  useEffect(() => {
    const vid = videoRef.current;

    if (volume === 0 && vid) {
      vid.muted = true;
      setIsMuted(true);
    }
    if (volume > 0 && vid) {
      vid.muted = false;
      setIsMuted(false);
    }
  }, [volume]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    videoRef.current.volume = 0.7;
    const onLoaded = () => setDuration(vid.duration);
    let lastUpdate = 0;
    const onTimeUpdate = () => {
      if (isSeeking.current) return;
      const now = performance.now();
      if (now - lastUpdate < 500) return; // ~2 updates/sec
      lastUpdate = now;
      setCurrentTime(vid.currentTime);
    };
    const onVolumeChange = () => {
      setVolume(vid.volume);
    };

    vid.addEventListener("loadedmetadata", onLoaded);
    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("volumechange", onVolumeChange);

    return () => {
      vid.removeEventListener("loadedmetadata", onLoaded);
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  // toggle play/pause when isPlaying changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    isPlaying ? vid.play() : vid.pause();
  }, [isPlaying]);

  const togglePlay = () => {
    // on first-ever play: hide immediately
    if (!initialPlay) {
      setInitialPlay(true);
      setShowCta(false);
    } else {
      // on subsequent toggles: flash for 0.2s
      setShowCta(true);
      setTimeout(() => setShowCta(false), 350);
    }
    setIsPlaying((v) => !v);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const onFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if ((el as any).webkitEnterFullscreen) {
      (el as any).webkitEnterFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  };

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const ctaVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: showCta ? 1 : 0.7 },
  };

  const containerVariants = {
    collapsed: { height: 28 }, // your "normal" height
    expanded: { height: 103 }, // height when slider is shown
  };

  const topPlayerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };
  const bottomPlayerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (!isHovered && isOpenMenu) setIsOpenMenu(false);
  }, [isHovered, isOpenMenu]);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHudTimer = useCallback(() => {
    // avoid state update if already hovered
    if (!isHoveredRef.current) {
      isHoveredRef.current = true;
      setIsHovered(true);
    }
    // clear any existing timer
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    // start a new 3s timer to hide
    hoverTimeout.current = setTimeout(() => {
      isHoveredRef.current = false;
      setIsHovered(false);
      hoverTimeout.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

  const handleSeekChange = useCallback((value: number) => {
    isSeeking.current = true;
    setCurrentTime(value);
  }, []);

  const handleSeekAfterChange = useCallback((value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
    isSeeking.current = false;
  }, []);

  return (
    <div
      onMouseEnter={startHudTimer}
      onMouseMove={startHudTimer}
      onTouchStart={startHudTimer}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setIsHovered(false);
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      }}
      className="section-beta__image"
    >
      {!initialPlay && (
        <div onClick={togglePlay} className="section-beta__image__thumb">
          <Image
            width={886}
            height={886}
            alt={"Beta Pass Cover"}
            src={"/beta-pass-cover.jpg"}
          />
        </div>
      )}
      {!videoError ? (
        <video
          onClick={togglePlay}
          ref={videoRef}
          aria-label={name}
          className="section-beta__video"
          src={"/beta-video-main-compressed.mp4"}
          poster={uri}
          playsInline
          loop

          controls={false}
          // muted // usually needed for autoplay to work
          onError={() => setVideoError(true)}
          preload="metadata"
          data-testid="beta-video"
        />
      ) : (
        <div className="section-beta__fallback">
          <Image width={460} height={460} alt={name} src={uri} />
        </div>
      )}
      <AnimatePresence mode="wait">
        {initialPlay && isHovered && (
          <motion.div
            key="player-top"
            variants={topPlayerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="video-player__top"
          >
            <div className="video-player__top__header">
              <div className="video-player__top__blur" />
              <span className="video-player__top__header">
                beta-pass.mp4<span className="regular-mb">(3.2mb)</span>
              </span>
            </div>
            <div className="video-player__menu">
              <button
                className={classNames("video-player__menu__button", {
                  "video-player__menu__button--active": isOpenMenu,
                })}
                onClick={() => setIsOpenMenu(!isOpenMenu)}
              >
                <PlayerMenu />
              </button>
              <AnimatePresence mode="wait">
                {isOpenMenu && (
                  <VideoPlayerMenu
                    onMouseMove={startHudTimer}
                    onClose={() => setIsOpenMenu(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="sync">
        {initialPlay && isHovered && (
          <motion.div
            key="player-bottom"
            variants={bottomPlayerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="video-player__bottom"
          >
            <button onClick={togglePlay} className="video-player__play">
              {isPlaying ? <PlayerPause /> : <PlayerPlay />}
            </button>
            <div className="video-player__seek">
              <TimeMarker time={currentTime} />
              <ReactSlider
                className="video-slider"
                thumbClassName="video-slider__thumb"
                trackClassName="video-slider__track"
                min={0}
                value={currentTime}
                max={duration}
                step={0.1}
                onChange={handleSeekChange}
                onAfterChange={handleSeekAfterChange}
              />
              <TimeMarker time={duration} />
            </div>
            <div className="video-player__mute__wrapper">
              <motion.div
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="video-player__mute"
                variants={containerVariants}
                initial="collapsed"
                animate={showVolumeSlider ? "expanded" : "collapsed"}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence initial={false}>
                  {showVolumeSlider && (
                    <motion.div
                      variants={sliderVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.3 }}
                      className="video-player__mute__slider"
                    >
                      <ReactSlider
                        className="audio-track"
                        thumbClassName="audio-track__thumb"
                        trackClassName="audio-track__track"
                        min={0}
                        max={1}
                        orientation="vertical"
                        invert
                        step={0.01}
                        value={volume}
                        onChange={(value: number) => {
                          if (videoRef.current) {
                            videoRef.current.volume = value;
                          }
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button onClick={toggleMute}>
                  {isMuted ? <PlayerUnmute /> : <PlayerMute />}
                </button>
              </motion.div>
            </div>
            <button onClick={onFullscreen} className="video-player__full">
              <PlayerFull />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="sync">
        {(showCta || (!isHovered && !isPlaying)) && (
          <motion.button
            key="cta"
            onClick={togglePlay}
            className="video-player__cta"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35 }}
          >
            {isPlaying ? <PlayerPauseLg /> : <PlayerPlayLg />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
