import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "primary" | "success" | "warning" | "emergency" | "accent" | "neutral";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning-foreground",
  emergency: "bg-emergency-soft text-emergency",
  accent: "bg-accent-soft text-accent",
  neutral: "bg-muted text-muted-foreground",
};

export function StatusBadge({
  tone = "neutral",
  children,
  dot = false,
  className,
}: {
  tone?: Tone | undefined;
  children: ReactNode;
  dot?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        toneClass[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
