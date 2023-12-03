import React, { useRef, useEffect, useState } from "react";

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!playing) {
            // Check if playing is false
            videoRef.current!.play(); // Play the video
            setPlaying(true); // Update playing state
          }
        } else {
          if (playing && videoRef.current) {
            videoRef.current!.pause();
            setPlaying(false);
          }
        }
      });
    }, options);
    observerRef.current = observer;
    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  return (
    <video
      ref={videoRef}
      disablePictureInPicture={true}
      controlsList="nodownload noplaybackrate"
      src={src}
      className=" aspect-auto max-h-[600px] object-cover w-[600px] max-w-[530px]"
      controls
    ></video>
  );
};

export default VideoPlayer;
