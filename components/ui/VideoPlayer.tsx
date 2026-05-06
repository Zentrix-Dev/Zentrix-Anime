// components/ui/VideoPlayer.tsx
"use client";

import { useState, useMemo } from "react";
import { VIDEO_SERVERS, VideoServer } from "@/lib/videoServers";

interface VideoPlayerProps {
  anilistId: number;
  episode: number;
}

export function VideoPlayer({ anilistId, episode }: VideoPlayerProps) {
  const [activeServerId, setActiveServerId] = useState<string>(VIDEO_SERVERS[0].id);
  const [language, setLanguage] = useState<'sub' | 'dub'>('sub');
  const [isLoading, setIsLoading] = useState(true);

  const activeServer = useMemo(
    () => VIDEO_SERVERS.find((s) => s.id === activeServerId) || VIDEO_SERVERS[0],
    [activeServerId]
  );

  const videoUrl = useMemo(() => {
    return activeServer.buildUrl({
      anilistId,
      episode,
      language,
    });
  }, [activeServer, anilistId, episode, language]);

  const handleServerChange = (serverId: string, serverSupports: ('sub' | 'dub')[]) => {
    setIsLoading(true);
    setActiveServerId(serverId);
    // Auto-switch language if the new server doesn't support the current one
    if (!serverSupports.includes(language)) {
      setLanguage(serverSupports[0]);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 16:9 Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border-subtle shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-card/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-display font-bold text-accent-secondary animate-pulse">
                Connecting to {activeServer.name}...
              </span>
            </div>
          </div>
        )}

        <iframe
          src={videoUrl}
          className="absolute inset-0 w-full h-full border-none"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Player Controls & Server Selection */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-elevated/50 p-4 rounded-xl border border-border-subtle backdrop-blur-md">
        
        {/* Sub/Dub Toggle */}
        <div className="flex items-center gap-2 bg-bg-secondary p-1 rounded-lg border border-border-subtle">
          <button
            onClick={() => {
              if (activeServer.supports.includes('sub')) setLanguage('sub');
            }}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
              language === 'sub' 
                ? 'bg-accent-primary text-white shadow-[0_0_10px_var(--accent-glow)]' 
                : 'text-text-muted hover:text-text-primary'
            } ${!activeServer.supports.includes('sub') && 'opacity-50 cursor-not-allowed'}`}
            disabled={!activeServer.supports.includes('sub')}
          >
            SUB
          </button>
          <button
            onClick={() => {
              if (activeServer.supports.includes('dub')) setLanguage('dub');
            }}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
              language === 'dub' 
                ? 'bg-accent-secondary text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                : 'text-text-muted hover:text-text-primary'
            } ${!activeServer.supports.includes('dub') && 'opacity-50 cursor-not-allowed'}`}
            disabled={!activeServer.supports.includes('dub')}
          >
            DUB
          </button>
        </div>

        {/* Server Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-display text-text-secondary mr-2">SERVERS:</span>
          {VIDEO_SERVERS.map((server) => (
            <button
              key={server.id}
              onClick={() => handleServerChange(server.id, server.supports)}
              className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all border ${
                activeServerId === server.id
                  ? 'bg-glass border-accent-primary text-text-primary shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-transparent border-border-subtle text-text-muted hover:border-text-secondary hover:text-text-primary'
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
