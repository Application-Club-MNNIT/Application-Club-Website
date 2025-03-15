import React, { useState, useEffect } from "react";

const MouseEffectBackground: React.FC = () => {
  const rows = 12;
  const columns = 20;
  const totalCells = rows * columns;
  const [hoveredCells, setHoveredCells] = useState<number[]>([]);
  const [lastHoveredCell, setLastHoveredCell] = useState<number | null>(null);
  const [mouseMoving, setMouseMoving] = useState(false);

  const handleMouseMove = (index: number) => {
    setMouseMoving(true);
    setLastHoveredCell(index);
    setHoveredCells((prev) => {
      if (prev.includes(index)) return prev;
      return [index, ...prev].slice(0, 6); // Keep more cells for a longer tail
    });
  };
  // Detect if the mouse has stopped moving
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMouseMoving(false);
    }, 150); // Short delay to check if mouse stops

    return () => clearTimeout(timeout);
  }, [hoveredCells]);

    // When mouse stops, fade out hovered cells gradually
    useEffect(() => {
    if (!mouseMoving) {
      setHoveredCells(lastHoveredCell !== null ? [lastHoveredCell] : []);
    }
  }, [mouseMoving, lastHoveredCell]);
  

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black">
      <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-0 w-full h-full">
        {Array.from({ length: totalCells }).map((_, index) => {
          const cellX = index % columns;
          const cellY = Math.floor(index / columns);

          const closestHover = hoveredCells.length ? hoveredCells[0] : null;
          const hoverX = closestHover !== null ? closestHover % columns : -1;
          const hoverY =
            closestHover !== null ? Math.floor(closestHover / columns) : -1;

          const distance =
            closestHover !== null
              ? Math.hypot(cellX - hoverX, cellY - hoverY)
              : Infinity;

          const trailIndex = hoveredCells.indexOf(index);
          let intensity = trailIndex !== -1 ? 1 - trailIndex * 0.1 : 0; // 🔥 Slower fade for a longer glow

          if (distance < 1.5) { // Reduced BFS depth effect
            intensity = Math.max(intensity, 1 - distance * 0.7); // Faster fade out
          }
          if (intensity < 0.05) intensity = 0;

          const bgColor = `rgba(255, 180, 50, ${intensity})`;
          const glow =
          intensity > 0.3
            ? `0px 0px ${intensity * 10}px rgba(255, 180, 50, 0.8)` // Less glow
            : "none";
          const scale = 1 + intensity * 0.15; // 🔥 Slightly bigger glow size

          return (
            <div
              key={index}
              className="aspect-square transition-all duration-150"
              style={{
                backgroundColor: bgColor,
                transform: `scale(${scale})`,
                boxShadow: glow,
              }}
              onMouseEnter={() => handleMouseMove(index)}
              onMouseMove={() => handleMouseMove(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export { MouseEffectBackground };
