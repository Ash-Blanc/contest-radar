import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "purple" | "blue" | "glow";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-zinc-800 text-zinc-200 border-zinc-700/80 hover:bg-zinc-700",
    secondary: "bg-zinc-900/90 text-zinc-400 border-zinc-800",
    outline: "border-zinc-700 text-zinc-300 bg-transparent",
    success: "bg-emerald-950/60 text-emerald-400 border-emerald-800/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    warning: "bg-amber-950/60 text-amber-400 border-amber-800/60",
    danger: "bg-rose-950/60 text-rose-400 border-rose-800/60",
    purple: "bg-purple-950/60 text-purple-300 border-purple-800/60 shadow-[0_0_14px_rgba(168,85,247,0.2)]",
    blue: "bg-sky-950/60 text-sky-300 border-sky-800/60 shadow-[0_0_14px_rgba(14,165,233,0.15)]",
    glow: "bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_16px_rgba(245,158,11,0.25)] font-semibold",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-mono transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
