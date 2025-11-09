interface LoaderProps {
  size?: number; // pixels
  color?: string; // CSS color for the head of the tail
  className?: string;
  ariaLabel?: string;
}

// Gentle "chasing tail" loader implemented as an inline SVG with lightweight SMIL animations.
// Self-contained so it doesn't rely on external CSS or animation libraries.
export default function Loader({
  size = 56,
  color = "var(--color-accent-base-standard)", // default to a pleasant blue
  className,
  ariaLabel = "Loading",
}: LoaderProps) {
  const viewBoxSize = 50;
  const radius = 20; // circle radius inside viewbox
  // circumference = 2 * PI * r (approx 125.66)
  const circumference = 2 * Math.PI * radius;
  // dash length and gap to make a short arc that will appear to chase
  const dash = +(circumference * 0.25).toFixed(1); // ~25%
  const gap = +(circumference - dash).toFixed(1);

  return (
    <span
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
      className={className}
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={ariaLabel ? undefined : true}
        focusable="false"
      >
        <defs>
          <linearGradient id="loaderGradient" x1="1" x2="0">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* subtle background ring */}
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          stroke="#e6eef8"
          strokeWidth="4"
        />

        {/* chasing arc (uses stroke-dasharray + rotate + dashoffset animation) */}
        <g transform={`translate(${viewBoxSize / 2}, ${viewBoxSize / 2})`}>
          <circle
            cx={0}
            cy={0}
            r={radius}
            fill="none"
            stroke="url(#loaderGradient)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset="0"
          >
            {/* rotate the arc around the circle to create the chasing motion */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="1.25s"
              repeatCount="indefinite"
            />

            {/* slowly offset the dash so the tail fades/grows slightly as it rotates */}
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to={-circumference}
              dur="1.25s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </span>
  );
}

