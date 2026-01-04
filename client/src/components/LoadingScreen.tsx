import { useState, useEffect } from "react";
import logoUrl from "@assets/akakakaka_1767418288626.png";
import videoUrl from "@assets/jhdhd_1767418329020.mp4";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation from 0 to 100%
    const duration = 2500; // 2.5 seconds to reach 100%
    const interval = 30; // Update every 30ms
    const increment = 100 / (duration / interval);
    
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, interval);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2800);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete();
    }, 3500);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      data-testid="loading-screen"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="loading-video"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/10" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative animate-pulse-glow rounded-full p-2">
          <img
            src={logoUrl}
            alt="ElyraOS Logo"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/30"
            data-testid="loading-logo"
          />
        </div>

        <h1
          className="text-4xl md:text-5xl font-heading font-bold gradient-text"
          data-testid="loading-title"
        >
          ElyraOS
        </h1>

        <div
          className="flex items-center gap-1 font-terminal text-sm text-white/80"
          data-testid="loading-text"
        >
          <span>Syncing distributed ledger</span>
          <span className="syncing-dot">.</span>
          <span className="syncing-dot">.</span>
          <span className="syncing-dot">.</span>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 flex flex-col items-center gap-2">
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
              data-testid="loading-progress-bar"
            />
          </div>
          <span
            className="font-mono text-sm text-white/90 font-medium"
            data-testid="loading-progress-text"
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
