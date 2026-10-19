import React from "react";
import { PlatformType } from "@/types/contest";

interface PlatformIconProps {
  platform: PlatformType;
  className?: string;
  size?: number;
}

export function PlatformIcon({ platform, className = "", size = 16 }: PlatformIconProps) {
  switch (platform) {
    case "codeforces":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect x="1.5" y="9" width="5" height="12" rx="1" fill="#4F8EF7" />
          <rect x="9.5" y="3" width="5" height="18" rx="1" fill="#2E5BF0" />
          <rect x="17.5" y="13.5" width="5" height="7.5" rx="1" fill="#FF5656" />
        </svg>
      );

    case "atcoder":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M12 2L2 22H22L12 2Z"
            stroke="#22C55E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 8L7 18H17L12 8Z" fill="#22C55E" fillOpacity="0.4" />
        </svg>
      );

    case "leetcode":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M15.5 3.5L8.5 10.5C7.5 11.5 7.5 13.5 8.5 14.5L15.5 21.5"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M11 12.5H21" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "meta":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M16.5 6C14.5 6 13 7.5 12 9C11 7.5 9.5 6 7.5 6C4.5 6 2 8.5 2 12C2 15.5 4.5 18 7.5 18C9.5 18 11 16.5 12 15C13 16.5 14.5 18 16.5 18C19.5 18 22 15.5 22 12C22 8.5 19.5 6 16.5 6Z"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "kaggle":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M5 3V21M19 4L10 13L19 21M13.5 9.5L7 16"
            stroke="#0EA5E9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "codechef":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
            stroke="#A855F7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12" stroke="#E9D5FF" strokeWidth="2" />
        </svg>
      );

    case "ieeextreme":
    case "icpc":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <circle cx="12" cy="12" r="9" stroke="#EAB308" strokeWidth="2" />
          <path d="M12 7V17M7 12H17" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#94A3B8" strokeWidth="2" />
          <path d="M8 12H16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
