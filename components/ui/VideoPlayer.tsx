// components/ui/VideoPlayer.tsx
"use client";

import { useState } from "react";
import { VIDEO_SERVERS } from "@/lib/videoServers";

interface VideoPlayerProps {
  anilistId: number;
  episode: number;
  tmdbId?: number; 
}

export function VideoPlayer({ anilistId, episode, tmdbId }: VideoPlayerProps) {
  const [activeServerId, setActiveServerId] = useState<string>(VIDEO_SERVERS[0].id);
  const [language, setLanguage] = useState<"sub" | "dub">("sub");

  const activeServer = VIDEO_SERVERS.find((s) => s.id === activeServerId) || VIDEO_SERVERS[0];

  const videoUrl = activeServer.buildUrl({
    anilistId,
    episode,
    language,
    tmdbId,
    season: 1, 
  });

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
      
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border-subtle shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Loading State Behind Video */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted z-0">
          <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-display font-bold uppercase tracking-widest text-sm">
            Connecting to {activeServer.name}...
          </p>
        </div>

        {/* Video Frame */}
        <iframe
          key={videoUrl}
          src={videoUrl}
          className="absolute inset-0 w-full h-full z-10"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
        />
      </div>

      {/* Controls */}
      <div className="bg-elevated/40 backdrop-blur-md border border-border-subtle p-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Audio Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider hidden sm:block">Audio:</span>
          <div className="flex bg-bg-card rounded-lg p-1 border border-border-subtle">
            <button
              onClick={() => setLanguage("sub")}
              className={`px-6 py-1.5 rounded-md text-sm font-bold transition-all ${
                language === "sub"
                  ? "bg-accent-primary text-white shadow-md"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              SUB
            </button>
            <button
              onClick={() => setLanguage("dub")}
              disabled={!activeServer.supports.includes("dub")}
              className={`px-6 py-1.5 rounded-md text-sm font-bold transition-all ${
                language === "dub"
                  ? "bg-accent-primary text-white shadow-md"
                  : "text-text-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              }`}
            >
              DUB
            </button>
          </div>
        </div>

        {/* Server Selection */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider hidden sm:block">Servers:</span>
          <div className="flex flex-wrap gap-2">
            {VIDEO_SERVERS.map((server) => {
              // Disable TMDB servers if no TMDB ID is provided to the component
              const isDisabled = server.type === "tmdb" && !tmdbId;

              return (
                <button
                  key={server.id}
                  onClick={() => {
                    setActiveServerId(server.id);
                    if (language === "dub" && !server.supports.includes("dub")) {
                      setLanguage("sub");
                    }
                  }}
                  disabled={isDisabled}
                  className={`px-4 py-1.5 rounded-lg text-sm font-display font-bold transition-all border ${
                    activeServerId === server.id
                      ? "bg-accent-primary/10 border-accent-primary text-accent-primary shadow-[0_0_10px_var(--accent-glow)]"
                      : isDisabled
                      ? "bg-bg-card/50 border-border-subtle text-text-muted/30 cursor-not-allowed"
                      : "bg-bg-card border-border-subtle text-text-secondary hover:border-accent-primary/50 hover:text-white"
                  }`}
                  title={isDisabled ? "Requires TMDB ID" : server.name}
                >
                  {server.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
