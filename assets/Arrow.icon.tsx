interface ArrowProps {
  className?: string;
  fillColor?: "#363636" | "green" | "red";
  opacity?: number;
  active?: boolean;
}

export const ArrowIcon = ({ className, fillColor = "#363636", opacity = 0.1, active }: ArrowProps = {}) => (
  <svg
    width="240"
    height="105"
    viewBox="0 0 240 105"
    strokeWidth="0"
    strokeLinejoin="round"
    stroke="#ffffff"
    opacity={opacity}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="greenGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#5EF577", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#00E117", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="redGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#FF0070", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#FB5E81", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M33.6 98.5L0 75.0476L120 0L240 75.0476L206.4 98.5L163.2 70.3572V105H120H76.8V70.3572L33.6 98.5Z"
      fill={fillColor === "green" ? "url(#greenGradient)" : fillColor === "red" ? "url(#redGradient)" : fillColor}
    />
  </svg>
);
