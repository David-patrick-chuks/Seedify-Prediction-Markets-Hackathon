import { memo } from "react";

export const Clouds = memo(({ className = "" }: { className?: string }) => (
  <div className={`absolute fadeIn top-0 left-0 flex flex-row z-0 w-screen h-screen ${className}`}>
    {Array.from({ length: 120 }, (_, index) => {
      // Calculate random values for position, size, animation duration, and delay
      const leftPosition = -30 + Math.random() * 130;
      const bottomPosition = -8;
      const cloudSize = Math.round(Math.random() * 200 + 20);
      const animationDuration = Math.random() * 3 + 3;
      const animationDelay = Math.random() * 4;

      const cloudStyle = {
        left: `${leftPosition}vw`, // Position based on viewport width
        bottom: `${bottomPosition}vh`, // Position based on viewport height
        width: cloudSize,
        height: cloudSize,
        backgroundColor: "white", // Change the color as needed
        borderRadius: "50%",
        animation: `levitate ${animationDuration}s ${animationDelay}s infinite alternate`,
      };

      return (
        //shadow-[inset_0px_10px_5px_rgba(0,142,255,0.1)]
        <div key={index} className="absolute" style={cloudStyle}></div>
      );
    })}
  </div>
));

Clouds.displayName = "Clouds";
