// components/ui/VideoPlayer.tsx
"use client"; // CRITICAL: This allows the buttons to work!

import { useState } from "react";
import { VIDEO_SERVERS } from "@/lib/videoServers";

interface VideoPlayerProps {
  anilistId: number;
  episode: number;
  tmdbId?: number; // Optional: Pass this if you fetch it from an external mapping API later
}

export function VideoPlayer({ anilistId, episode, tmdbId }: VideoPlayerProps) {
  const [activeServerId, setActiveServerId] = useState<string>(VIDEO_SERVERS[0].id);
  const [language, setLanguage] = useState<"sub" | "dub">("sub");

  // Find the currently selected server configuration
  const activeServer = VIDEO_SERVERS.find((s) => s.id === activeServerId) || VIDEO_SERVERS[0];

  // Generate the actual iframe URL
  const videoUrl = activeServer.buildUrl({
    anilistId,
    episode,
    language,
    tmdbId,
    season: 1, // Defaulting to 1, you can map this dynamically later
  });

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
      
      {/* 16:9 Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border-subtle shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Loading Placeholder (shows behind iframe) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted z-0">
          <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-display font-bold">Connecting to {activeServer.name}...</p>
        </div>

        {/* The Actual Video Embed */}
        <iframe
          key={videoUrl} // Forcing React to reload the iframe when URL changes
          src={videoUrl}
          className="absolute inset-0 w-full h-full z-10"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Server & Language Controls */}
      <div className="bg-elevated/40 backdrop-blur-md border border-border-subtle p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Language Toggles */}
        <div className="flex bg-bg-card rounded-lg p-1 border border-border-subtle">
          <button
            onClick={() => setLanguage("sub")}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
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
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
              language === "dub"
                ? "bg-accent-primary text-white shadow-md"
                : "text-text-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            }`}
          >
            DUB
          </button>
        </div>

        {/* Server Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider mr-2">
            Servers:
          </span>
          {VIDEO_SERVERS.map((server) => (
            <button
              key={server.id}
              onClick={() => {
                setActiveServerId(server.id);
                // Switch back to sub if the newly selected server doesn't support dub
                if (language === "dub" && !server.supports.includes("dub")) {
                  setLanguage("sub");
                }
              }}
              className={`px-4 py-1.5 rounded-lg text-sm font-display font-bold transition-all border ${
                activeServerId === server.id
                  ? "bg-accent-primary/10 border-accent-primary text-accent-primary shadow-[0_0_10px_var(--accent-glow)]"
                  : "bg-bg-card border-border-subtle text-text-secondary hover:border-accent-primary/50 hover:text-white"
              }`}
            >
              {server.name}
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
              }
