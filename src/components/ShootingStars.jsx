import React from 'react';
import './ShootingStars.css';

const ShootingStars = () => {
  const stars = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden perspective-[1500px]">
      {stars.map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 1.5 + Math.random(); // 1.5s to 2.5s

        return (
          <div
            key={i}
            className="shooting-star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ShootingStars;
