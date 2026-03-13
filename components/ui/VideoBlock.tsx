'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

interface VideoBlockProps {
  video: string;
  mobileVideo: string | null;
  alt?: string;
}

export default function VideoBlock({ video, mobileVideo, alt }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const playVideo = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    el.play()
      .then(() => setIsPlaying(true))
      .catch((error: Error) => {
        setIsPlaying(false);
        console.log('Error trying to play the video:', error.message);
      });
  }, []);

  useEffect(() => {
    playVideo(videoRef.current);
    playVideo(mobileVideoRef.current);
  }, [playVideo]);

  const togglePlayPause = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isPlaying) {
      videoRef.current?.pause();
      mobileVideoRef.current?.pause();
      setIsPlaying(false);
    } else {
      playVideo(videoRef.current);
      playVideo(mobileVideoRef.current);
    }
  };

  return (
    <>
      {/* Desktop Video */}
      <div className={`relative ${mobileVideo ? 'hidden md:block' : 'block'}`}>
        <video
          ref={videoRef}
          src={video}
          aria-label={alt}
          className="w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <button
          onClick={togglePlayPause}
          className={`absolute flex items-center justify-center bg-black text-white rounded-full z-10 ${
            isPlaying
              ? 'bottom-4 right-4 w-6 h-6'
              : '-translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 w-24 h-24'
          }`}
        >
          <span className={isPlaying ? 'text-xs' : 'text-4xl'}>
            {isPlaying ? '❚❚' : '▶'}
          </span>
        </button>
      </div>

      {/* Mobile Video */}
      {mobileVideo && (
        <div className="relative block md:hidden">
          <video
            ref={mobileVideoRef}
            src={mobileVideo}
            aria-label={alt}
            className="w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <button
            onClick={togglePlayPause}
            className={`absolute flex items-center justify-center bg-black text-white rounded-full z-10 ${
              isPlaying
                ? 'bottom-4 right-4 w-6 h-6'
                : '-translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 w-24 h-24'
            }`}
          >
            <span className={isPlaying ? 'text-xs' : 'text-4xl'}>
              {isPlaying ? '❚❚' : '▶'}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
