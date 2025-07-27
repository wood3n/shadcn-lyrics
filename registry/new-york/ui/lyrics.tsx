'use client';

import { useEffect, useRef } from 'react';

interface LyricLine {
  time: number;
  text: string;
  id: string;
}

interface LyricsViewerProps {
  lyrics: LyricLine[];
  currentTime: number;
  title?: string;
  className?: string;
}

export default function LyricsViewer({ lyrics, currentTime }: LyricsViewerProps) {
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  // Find current line based on time
  const findCurrentLine = (time: number) => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (time >= lyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const currentLineIndex = findCurrentLine(currentTime);

  // Auto-scroll to current line
  useEffect(() => {
    if (currentLineIndex >= 0 && lyricsContainerRef.current) {
      const currentElement = document.getElementById(lyrics[currentLineIndex].id);
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [currentLineIndex, lyrics]);

  return (
    <div ref={lyricsContainerRef} className="h-80 overflow-y-auto scroll-smooth px-4">
      <div className="space-y-4 py-8">
        {lyrics.map((line, index) => (
          <div
            key={line.id}
            id={line.id}
            className={`
                  transition-all duration-500 ease-in-out text-center leading-relaxed text-lg
                  ${index === currentLineIndex ? 'text-blue-600 font-bold scale-105' : 'text-muted-foreground'}
                  ${index < currentLineIndex ? 'opacity-50' : ''}
                `}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export type { LyricLine, LyricsViewerProps };
