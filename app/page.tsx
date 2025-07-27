'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause } from 'lucide-react';
import Lyrics, { type LyricLine } from '@/registry/new-york/ui/lyrics';

// Sample lyrics data with timestamps (in seconds)
const sampleLyrics: LyricLine[] = [
  { time: 0, text: 'Sample lyric line one', id: 'line-0' },
  { time: 3.5, text: 'Sample lyric line two', id: 'line-1' },
  { time: 7.2, text: 'Sample lyric line three', id: 'line-2' },
  { time: 10.8, text: 'Sample lyric line four', id: 'line-3' },
  { time: 14.5, text: 'Sample lyric line five', id: 'line-4' },
  { time: 18.1, text: 'Sample lyric line six', id: 'line-5' },
  { time: 21.7, text: 'Sample lyric line seven', id: 'line-6' },
  { time: 25.3, text: 'Sample lyric line eight', id: 'line-7' },
  { time: 29.0, text: 'Chorus: Sample chorus line', id: 'line-8' },
  { time: 32.6, text: 'Sample chorus continues', id: 'line-9' },
  { time: 36.2, text: 'More sample lyrics here', id: 'line-10' },
  { time: 39.8, text: 'Another sample line', id: 'line-11' },
  { time: 43.5, text: 'Sample verse continues', id: 'line-12' },
  { time: 47.1, text: 'More sample content', id: 'line-13' },
  { time: 50.7, text: 'Sample lyrics continue', id: 'line-14' },
  { time: 54.3, text: 'Final sample lines', id: 'line-15' }
];

export default function LyricsDisplay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(60); // 60 seconds for demo
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // Update current time
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Simple Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button size="lg" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Progress value={(currentTime / duration) * 100} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sample Song</CardTitle>
        </CardHeader>
        <CardContent>
          <Lyrics lyrics={sampleLyrics} currentTime={currentTime} title="Sample Song" />
        </CardContent>
      </Card>
    </div>
  );
}
