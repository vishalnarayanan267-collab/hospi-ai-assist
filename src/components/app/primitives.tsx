import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { ComponentType, ReactNode } from "react";
import { StatusBadge } from "./StatusBadge";

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  tone = "default",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  tone?: "default" | "emergency" | "data" | "calm";
}) {
  const toneRing = {
    default: "",
    emergency: "border-emergency/30 bg-emergency-soft",
    data: "border-accent/25 bg-accent-soft",
    calm: "border-success/25 bg-success-soft",
  }[tone];

  return (
    <header
      className={cn(
        "mb-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6",
        toneRing,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
  icon: Icon,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lifted",
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            {Icon && (
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-4" />
              </span>
            )}
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground">{title}</h2>
              {description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          {action}
        </div>
      )}
      <div className={cn("flex-1 p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  unit,
  hint,
  icon: Icon,
  tone = "primary",
  trend,
}: {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  icon?: ComponentType<{ className?: string }>;
  tone?: "primary" | "success" | "warning" | "emergency" | "accent";
  trend?: string;
}) {
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    emergency: "bg-emergency-soft text-emergency",
    accent: "bg-accent-soft text-accent",
  };
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lifted">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {Icon && (
          <span className={cn("grid size-9 place-items-center rounded-2xl", toneMap[tone])}>
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="mt-3 flex items-baseline gap-1 text-3xl font-semibold text-foreground">
        {value}
        {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {trend && <StatusBadge tone={tone}>{trend}</StatusBadge>}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
}: {
  title: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface/60 px-6 py-12 text-center">
      {Icon && (
        <span className="grid size-12 place-items-center rounded-2xl bg-card text-muted-foreground shadow-soft">
          <Icon className="size-5" />
        </span>
      )}
      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-3xl border border-emergency/30 bg-emergency-soft p-5 text-sm">
      <p className="font-semibold text-emergency">Couldn't load this data</p>
      <p className="mt-1 text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-xl border border-emergency/40 px-3 py-1.5 text-xs font-medium text-emergency"
        >
          Try again
        </button>
      )}
    </div>
  );
}
