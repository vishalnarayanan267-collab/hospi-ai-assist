import { cn } from "@/lib/utils";
import { type ComponentProps, type ReactNode, useId, useState } from "react";

/* ---------- Button ---------- */

type Variant =
  | "primary"
  | "emergency"
  | "outline"
  | "ghost"
  | "soft"
  | "success"
  | "accent";
type Size = "sm" | "md" | "lg";

const variantMap: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
  emergency: "bg-emergency text-emergency-foreground hover:bg-emergency/90 shadow-emergency",
  success: "bg-success text-success-foreground hover:bg-success/90 shadow-soft",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft",
  outline: "border border-border bg-card text-foreground hover:bg-surface",
  ghost: "text-muted-foreground hover:bg-surface hover:text-foreground",
  soft: "bg-primary-soft text-primary hover:bg-primary-soft/70",
};

const sizeMap: Record<Size, string> = {
  sm: "h-9 px-3 text-xs gap-1.5 rounded-xl",
  md: "h-11 px-4 text-sm gap-2 rounded-2xl",
  lg: "h-13 px-6 text-base gap-2.5 rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-medium transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    />
  );
}

export function IconButton({
  className,
  label,
  ...props
}: ComponentProps<"button"> & { label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-2xl border border-border bg-card text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* ---------- Inputs ---------- */

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-2xl border border-input bg-card px-3 text-sm text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full rounded-2xl border border-input bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-card shadow-soft transition-transform",
          checked ? "translate-x-5.5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

/* ---------- Progress ---------- */

export function Progress({
  value,
  tone = "primary",
  className,
}: {
  value: number;
  tone?: "primary" | "success" | "warning" | "emergency" | "accent";
  className?: string;
}) {
  const bar = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    emergency: "bg-emergency",
    accent: "bg-accent",
  }[tone];
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", bar)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ---------- Tabs ---------- */

export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex w-full gap-1 overflow-x-auto rounded-2xl border border-border bg-surface p-1",
        className,
      )}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
            value === t.id
              ? "bg-card text-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Avatar ---------- */

export function Avatar({
  name,
  className,
  tone = "primary",
}: {
  name: string;
  className?: string;
  tone?: "primary" | "accent" | "success" | "emergency";
}) {
  const initials = name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent",
    success: "bg-success-soft text-success",
    emergency: "bg-emergency-soft text-emergency",
  };
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-2xl text-xs font-semibold",
        toneMap[tone],
        className,
      )}
    >
      {initials}
    </span>
  );
}

/* ---------- Field / rows ---------- */

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div id={id}>{children}</div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function DataRow({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border py-2.5 last:border-0",
        className,
      )}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Disclosure ---------- */

export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={item.question} className="py-3">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 text-left text-sm font-medium text-foreground"
          >
            {item.question}
            <span className="text-muted-foreground">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
