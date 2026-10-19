import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glow";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variantStyles = {
      primary:
        "bg-zinc-100 text-zinc-950 hover:bg-white active:bg-zinc-200 border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_12px_rgba(255,255,255,0.15)] font-medium",
      secondary:
        "bg-zinc-800/90 text-zinc-100 hover:bg-zinc-700/90 active:bg-zinc-800 border-zinc-700/80 shadow-sm",
      outline:
        "border-zinc-700/80 text-zinc-200 hover:bg-zinc-800/70 hover:border-zinc-600 active:bg-zinc-800 bg-transparent",
      ghost:
        "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 active:bg-zinc-800 border-transparent",
      danger:
        "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 border-transparent shadow-sm",
      glow:
        "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-zinc-950 font-semibold hover:brightness-110 active:brightness-95 border-transparent shadow-[0_0_20px_rgba(245,158,11,0.35)]",
    };

    const sizeStyles = {
      sm: "h-8 px-2.5 text-xs gap-1.5 rounded-md",
      md: "h-9 px-3.5 text-sm gap-2 rounded-lg",
      lg: "h-11 px-5 text-base gap-2.5 rounded-lg",
      icon: "h-9 w-9 p-0 rounded-lg justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center border font-sans select-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
