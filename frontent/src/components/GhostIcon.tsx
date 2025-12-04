import { cn } from "@/lib/utils";

interface GhostIconProps {
  className?: string;
  size?: number;
}

export const GhostIcon = ({ className, size = 24 }: GhostIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C7.58 2 4 5.58 4 10V20.5C4 21.05 4.45 21.5 5 21.5C5.28 21.5 5.53 21.38 5.71 21.21L7 19.92L8.29 21.21C8.68 21.6 9.32 21.6 9.71 21.21L11 19.92L12.29 21.21C12.68 21.6 13.32 21.6 13.71 21.21L15 19.92L16.29 21.21C16.68 21.6 17.32 21.6 17.71 21.21L19 19.92L20.29 21.21C20.47 21.39 20.72 21.5 21 21.5C21.55 21.5 22 21.05 22 20.5V10C22 5.58 18.42 2 14 2H12Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M12 2C7.58 2 4 5.58 4 10V20.5C4 21.05 4.45 21.5 5 21.5C5.28 21.5 5.53 21.38 5.71 21.21L7 19.92L8.29 21.21C8.68 21.6 9.32 21.6 9.71 21.21L11 19.92L12.29 21.21C12.68 21.6 13.32 21.6 13.71 21.21L15 19.92L16.29 21.21C16.68 21.6 17.32 21.6 17.71 21.21L19 19.92L20.29 21.21C20.47 21.39 20.72 21.5 21 21.5C21.55 21.5 22 21.05 22 20.5V10C22 5.58 18.42 2 14 2H12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="10" r="1.5" fill="currentColor" />
    <circle cx="15" cy="10" r="1.5" fill="currentColor" />
  </svg>
);
