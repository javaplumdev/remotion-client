import * as React from "react";

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Create seamless looping wave effect
  const waveOffset = interpolate(
    frame % durationInFrames,
    [0, durationInFrames],
    [0, 400],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0f19",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 400,
          height: 300,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          border: "2px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Flowing fill bar at 100% with wave effect */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            background: "linear-gradient(90deg, #00d4ff, #0099ff, #00d4ff)",
            filter: "drop-shadow(0 0 20px rgba(0, 212, 255, 0.6))",
            overflow: "hidden",
          }}
        >
          {/* Wave animation inside the bar */}
          <svg
            style={{
              position: "absolute",
              width: "200%",
              height: "100%",
              left: `${-waveOffset}px`,
              top: 0,
            }}
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0, 212, 255, 0.3)" />
                <stop offset="50%" stopColor="rgba(0, 212, 255, 0.8)" />
                <stop offset="100%" stopColor="rgba(0, 212, 255, 0.3)" />
              </linearGradient>
            </defs>
            <path
              d="M 0,50 Q 50,20 100,50 T 200,50 T 300,50 T 400,50 L 400,100 L 0,100 Z"
              fill="url(#waveGrad)"
            />
          </svg>
        </div>

        {/* Percentage text overlay */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: 48,
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textShadow: "0 0 20px rgba(0, 212, 255, 0.8)",
            zIndex: 10,
          }}
        >
          100%
        </div>
      </div>
    </AbsoluteFill>
  );
};
