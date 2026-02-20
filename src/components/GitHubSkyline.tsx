import { useEffect, useRef, useState } from 'react';

interface WeekData {
  week: string;
  count: number;
}

export default function GitHubSkyline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeline, setTimeline] = useState<WeekData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState<{x: number; y: number; size: number; opacity: number}[]>([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE || '';
        const response = await fetch(`${baseUrl}/api/github/contribution-timeline?weeks=15`);
        if (response.ok) {
          const data = await response.json();
          console.log('[GitHubSkyline] Fetched timeline:', data.timeline?.length, 'weeks');
          setTimeline(data.timeline || []);
        }
      } catch (err) {
        console.error('[GitHubSkyline] Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 200 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = 200;
    const barWidth = Math.max(3, (width - 40) / Math.max(timeline.length, 1));
    const maxCount = Math.max(...timeline.map(t => t.count), 1);

    // Transparent background - blend with page
    ctx.clearRect(0, 0, width, height);

    // Generate stars
    if (stars.length === 0) {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.6,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      setStars(newStars);
    }

    // Draw stars
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });

    // Draw buildings based on commit count
    timeline.forEach((week, i) => {
      const x = 20 + i * barWidth;
      const normalizedHeight = (week.count / maxCount) * (height * 0.7);
      const barHeight = Math.max(normalizedHeight, week.count > 0 ? 8 : 2);

      // Building colors based on height
      let buildingColor: string;
      let windowColor: string;
      
      if (week.count === 0) {
        // No commits - dark silhouette
        buildingColor = '#1a1a2e';
        windowColor = 'transparent';
      } else if (week.count < 3) {
        // Low - small building / tree
        buildingColor = '#2d2d4a';
        windowColor = '#4a4a6a';
      } else if (week.count < 7) {
        // Medium - building
        buildingColor = '#3d3d5c';
        windowColor = '#6a6a8a';
      } else if (week.count < 15) {
        // Tall building
        buildingColor = '#4d4d6c';
        windowColor = '#7a7a9a';
      } else {
        // Skyscraper
        buildingColor = '#5d5d7c';
        windowColor = '#8a8aaa';
      }

      // Draw building
      const buildingHeight = Math.max(barHeight, 10);
      const y = height - buildingHeight - 10;

      ctx.fillStyle = buildingColor;
      ctx.beginPath();
      
      // Building with slight variation
      const variance = Math.sin(i * 0.5) * 2;
      ctx.moveTo(x + 1, height - 10);
      ctx.lineTo(x + 1, y + variance);
      ctx.lineTo(x + barWidth - 2, y - variance);
      ctx.lineTo(x + barWidth - 2, height - 10);
      ctx.closePath();
      ctx.fill();

      // Draw windows
      if (week.count > 0 && barWidth > 4) {
        const windowRows = Math.floor(buildingHeight / 6);
        const windowCols = Math.floor(barWidth / 4);
        
        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowCols; col++) {
            if (Math.random() > 0.3) {
              const wx = x + 3 + col * 4;
              const wy = y + 4 + row * 6;
              ctx.fillStyle = windowColor;
              ctx.globalAlpha = 0.6 + Math.random() * 0.4;
              ctx.fillRect(wx, wy, 2, 3);
              ctx.globalAlpha = 1;
            }
          }
        }
      }

    });

  }, [timeline, stars, loading]);

  return (
    <div className="relative w-full" style={{ height: '180px' }}>
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ height: '180px' }}
      />
    </div>
  );
}
