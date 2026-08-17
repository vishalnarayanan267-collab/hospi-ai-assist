import { Link } from "@tanstack/react-router";
import {
  Activity,
  Ambulance as AmbulanceIcon,
  ArrowRight,
  BedDouble,
  Building2,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { Button, Chip, Progress } from "./ui";
import type { Ambulance, Doctor, EmergencyCase, Hospital, AppNotification } from "@/services";

/* ---------- Metric card ---------- */

export function MetricCard({
  label,
  value,
  unit,
  hint,
  icon: Icon,
  tone = "primary",
  progress,
}: {
  label: string;
  value: string | number;
  unit?: string | undefined;
  hint?: string | undefined;
  icon?: ComponentType<{ className?: string }> | undefined;
  tone?: "primary" | "success" | "warning" | "emergency" | "accent" | undefined;
  progress?: number | undefined;
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
      {progress !== undefined && <Progress value={progress} tone={tone} className="mt-3" />}
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ---------- Chart card ---------- */

const axis = {
  tick: { fill: "var(--color-muted-foreground)", fontSize: 11 },
  stroke: "var(--color-border)",
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 16,
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    color: "var(--color-card-foreground)",
    fontSize: 12,
    boxShadow: "var(--shadow-lifted)",
  },
  labelStyle: { color: "var(--color-muted-foreground)" },
} as const;

export function ChartCard({
  title,
  description,
  action,
  type = "area",
  data,
  xKey,
  series,
  height = 220,
  className,
}: {
  title: string;
  description?: string | undefined;
  action?: ReactNode | undefined;
  type?: "area" | "line" | "bar" | undefined;
  data: Record<string, unknown>[];
  xKey: string;
  series: { key: string; label: string; color: string }[];
  height?: number | undefined;
  className?: string | undefined;
}) {
  return (
    <section
      className={cn("rounded-3xl border border-border bg-card p-5 shadow-soft", className)}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data} margin={{ left: -20, right: 6, top: 6 }}>
              <CartesianGrid stroke={axis.stroke} vertical={false} />
              <XAxis dataKey={xKey} tick={axis.tick} stroke={axis.stroke} />
              <YAxis tick={axis.tick} stroke={axis.stroke} />
              <Tooltip {...tooltipStyle} />
              {series.map((s) => (
                <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[8, 8, 0, 0]} />
              ))}
            </BarChart>
          ) : type === "line" ? (
            <LineChart data={data} margin={{ left: -20, right: 6, top: 6 }}>
              <CartesianGrid stroke={axis.stroke} vertical={false} />
              <XAxis dataKey={xKey} tick={axis.tick} stroke={axis.stroke} />
              <YAxis tick={axis.tick} stroke={axis.stroke} />
              <Tooltip {...tooltipStyle} />
              {series.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          ) : (
            <AreaChart data={data} margin={{ left: -20, right: 6, top: 6 }}>
              <defs>
                {series.map((s) => (
                  <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid stroke={axis.stroke} vertical={false} />
              <XAxis dataKey={xKey} tick={axis.tick} stroke={axis.stroke} />
              <YAxis tick={axis.tick} stroke={axis.stroke} />
              <Tooltip {...tooltipStyle} />
              {series.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2}
                  fill={`url(#g-${s.key})`}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/* ---------- Hospital card ---------- */

export function HospitalCard({
  hospital,
  recommended,
  selected,
  reservedBed,
  onSelect,
  onReserve,
}: {
  hospital: Hospital;
  recommended?: boolean | undefined;
  selected?: boolean | undefined;
  reservedBed?: string | undefined;
  onSelect?: () => void | undefined;
  onReserve?: () => void | undefined;
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lifted",
        selected && "border-primary/40 ring-1 ring-primary/20",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{hospital.name}</h3>
            {recommended && (
              <StatusBadge tone="accent">
                <Sparkles className="size-3" /> AI best match
              </StatusBadge>
            )}
            {selected && <StatusBadge tone="primary">Selected</StatusBadge>}
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {hospital.area}, {hospital.city}
            </span>
            <span>{hospital.distanceKm} km</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {hospital.etaMin} min ETA
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" /> {hospital.rating} ({hospital.reviews})
            </span>
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-semibold text-primary">{hospital.aiScore}</p>
          <p className="text-[11px] text-muted-foreground">AI score</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "ICU", v: hospital.icuBeds },
          { label: "Emergency", v: hospital.emergencyBeds },
          { label: "General", v: hospital.generalBeds },
          { label: "Ventilators", v: hospital.ventilators },
        ].map((b) => (
          <div key={b.label} className="rounded-2xl bg-surface p-3">
            <p className="text-[11px] text-muted-foreground">{b.label}</p>
            <p className="text-sm font-semibold text-foreground">
              {b.v.available}
              <span className="text-xs font-normal text-muted-foreground"> / {b.v.total}</span>
            </p>
          </div>
        ))}
      </div>

      <p className="rounded-2xl bg-accent-soft px-3 py-2 text-xs text-accent">{hospital.aiReason}</p>

      <div className="flex flex-wrap items-center gap-2">
        <Chip>{hospital.type}</Chip>
        <Chip>{hospital.doctorsOnDuty} doctors on duty</Chip>
        <Chip>{hospital.waitingTimeMin} min ER wait</Chip>
        {hospital.trauma && <StatusBadge tone="emergency">Trauma centre</StatusBadge>}
        {reservedBed && <StatusBadge tone="success" dot>{reservedBed} reserved</StatusBadge>}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <Link to="/hospitals/$hospitalId" params={{ hospitalId: hospital.id }}>
          <Button variant="outline" size="sm">
            View hospital <ArrowRight className="size-3.5" />
          </Button>
        </Link>
        {onSelect && (
          <Button size="sm" onClick={onSelect} disabled={selected}>
            {selected ? "Hospital selected" : "Select hospital"}
          </Button>
        )}
        {onReserve && (
          <Button size="sm" variant="soft" onClick={onReserve} disabled={!!reservedBed}>
            {reservedBed ? "Bed reserved" : "Reserve emergency bed"}
          </Button>
        )}
      </div>
    </article>
  );
}

/* ---------- Doctor card ---------- */

export function DoctorCard({
  doctor,
  hospitalName,
  notified,
  onNotify,
}: {
  doctor: Doctor;
  hospitalName?: string | undefined;
  notified?: boolean | undefined;
  onNotify?: () => void | undefined;
}) {
  const tone =
    doctor.availability === "available"
      ? "success"
      : doctor.availability === "in-surgery"
        ? "warning"
        : "neutral";
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lifted">
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Stethoscope className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-foreground">{doctor.name}</h3>
          <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
          {hospitalName && <p className="mt-1 text-xs text-muted-foreground">{hospitalName}</p>}
        </div>
        <StatusBadge tone={tone} dot>
          {doctor.availability.replace("-", " ")}
        </StatusBadge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { l: "Experience", v: `${doctor.experienceYears} yrs` },
          { l: "Rating", v: doctor.rating },
          { l: "Patients today", v: doctor.patientsToday },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-surface p-3">
            <p className="text-sm font-semibold text-foreground">{s.v}</p>
            <p className="text-[11px] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {doctor.languages.map((l) => (
          <Chip key={l}>{l}</Chip>
        ))}
        {doctor.emergencyAvailable && <StatusBadge tone="emergency">Emergency on-call</StatusBadge>}
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <Link to="/doctors/$doctorId" params={{ doctorId: doctor.id }}>
          <Button variant="outline" size="sm">
            View profile <ArrowRight className="size-3.5" />
          </Button>
        </Link>
        {onNotify && (
          <Button size="sm" onClick={onNotify} disabled={notified}>
            {notified ? "Doctor notified" : "Notify for emergency"}
          </Button>
        )}
      </div>
    </article>
  );
}

/* ---------- Ambulance card ---------- */

export function AmbulanceCard({
  ambulance,
  destination,
  onCall,
  active,
}: {
  ambulance: Ambulance;
  destination?: string | undefined;
  onCall?: () => void | undefined;
  active?: boolean | undefined;
}) {
  const tone =
    ambulance.status === "en-route"
      ? "emergency"
      : ambulance.status === "available"
        ? "success"
        : "warning";
  return (
    <article
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lifted",
        active && "border-emergency/40 ring-1 ring-emergency/20",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emergency-soft text-emergency">
            <AmbulanceIcon className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground">{ambulance.id}</h3>
            <p className="text-xs text-muted-foreground">
              {ambulance.vehicleNo} · {ambulance.type} unit
            </p>
          </div>
        </div>
        <StatusBadge tone={tone} dot>
          {ambulance.status.replace("-", " ")}
        </StatusBadge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { l: "ETA", v: `${ambulance.etaMin} min` },
          { l: "Distance", v: `${ambulance.distanceKm} km` },
          { l: "Speed", v: `${ambulance.speedKmph} km/h` },
          { l: "Traffic", v: ambulance.traffic },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-surface p-3">
            <p className="text-[11px] text-muted-foreground">{s.l}</p>
            <p className="text-sm font-semibold capitalize text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-xs text-muted-foreground">
        <p>
          Driver <span className="font-medium text-foreground">{ambulance.driver}</span> ·{" "}
          {ambulance.paramedics} paramedics
        </p>
        {destination && (
          <p>
            Destination <span className="font-medium text-foreground">{destination}</span>
          </p>
        )}
      </div>

      {onCall && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onCall}>
          <Phone className="size-3.5" /> Call driver
        </Button>
      )}
    </article>
  );
}

/* ---------- Emergency card ---------- */

export function EmergencyCard({
  emergency,
  hospitalName,
  actions,
}: {
  emergency: EmergencyCase;
  hospitalName?: string | undefined;
  actions?: ReactNode | undefined;
}) {
  const tone =
    emergency.severity === "critical"
      ? "emergency"
      : emergency.severity === "high"
        ? "warning"
        : emergency.severity === "moderate"
          ? "primary"
          : "success";
  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lifted">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{emergency.type}</h3>
            <StatusBadge tone={tone} dot>
              {emergency.severity}
            </StatusBadge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {emergency.id} · {emergency.patientName}, {emergency.age} · {emergency.createdAt}
          </p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" /> {emergency.location}
          </p>
        </div>
        <StatusBadge tone="primary">{emergency.status}</StatusBadge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { l: "Heart rate", v: `${emergency.vitals.hr} bpm` },
          { l: "SpO₂", v: `${emergency.vitals.spo2}%` },
          { l: "BP", v: emergency.vitals.bp },
        ].map((v) => (
          <div key={v.l} className="rounded-2xl bg-surface p-3">
            <p className="text-[11px] text-muted-foreground">{v.l}</p>
            <p className="text-sm font-semibold text-foreground">{v.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Chip>{emergency.ambulanceId}</Chip>
        {hospitalName && <Chip>{hospitalName}</Chip>}
      </div>

      {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
    </article>
  );
}

/* ---------- Bed availability card ---------- */

export function BedAvailabilityCard({
  hospital,
  reservedBed,
  onReserve,
}: {
  hospital: Hospital;
  reservedBed?: string | undefined;
  onReserve?: (bedType: string) => void | undefined;
}) {
  const rows = [
    { label: "ICU beds", v: hospital.icuBeds, tone: "emergency" as const },
    { label: "Emergency beds", v: hospital.emergencyBeds, tone: "warning" as const },
    { label: "General beds", v: hospital.generalBeds, tone: "primary" as const },
    { label: "Ventilators", v: hospital.ventilators, tone: "accent" as const },
  ];
  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lifted">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">{hospital.name}</h3>
          <p className="text-xs text-muted-foreground">
            {hospital.area} · {hospital.distanceKm} km · {hospital.waitingTimeMin} min wait
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
          <BedDouble className="size-5" />
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((r) => {
          const occupancy = Math.round(((r.v.total - r.v.available) / r.v.total) * 100);
          return (
            <div key={r.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-medium text-foreground">
                  {r.v.available} free · {occupancy}% occupied
                </span>
              </div>
              <Progress value={occupancy} tone={r.tone} className="mt-1.5" />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {reservedBed ? (
          <StatusBadge tone="success" dot>
            {reservedBed} held for 30 min
          </StatusBadge>
        ) : (
          onReserve && (
            <>
              <Button size="sm" onClick={() => onReserve("ICU-14")}>
                Reserve ICU bed
              </Button>
              <Button size="sm" variant="outline" onClick={() => onReserve("ER-07")}>
                Reserve ER bed
              </Button>
            </>
          )
        )}
      </div>
    </article>
  );
}

/* ---------- Wearable metric card ---------- */

export function WearableMetricCard({
  label,
  value,
  unit,
  status,
  range,
  icon: Icon,
  spark,
}: {
  label: string;
  value: string | number;
  unit?: string | undefined;
  status: "normal" | "elevated" | "critical";
  range: string;
  icon: ComponentType<{ className?: string }>;
  spark?: { t: string | number; v: number }[];
}) {
  const tone = status === "critical" ? "emergency" : status === "elevated" ? "warning" : "success";
  const color =
    status === "critical"
      ? "var(--color-emergency)"
      : status === "elevated"
        ? "var(--color-warning)"
        : "var(--color-success)";
  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lifted">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "grid size-9 place-items-center rounded-2xl",
              tone === "emergency"
                ? "bg-emergency-soft text-emergency"
                : tone === "warning"
                  ? "bg-warning-soft text-warning-foreground"
                  : "bg-success-soft text-success",
            )}
          >
            <Icon className="size-4" />
          </span>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
        <StatusBadge tone={tone} dot>
          {status}
        </StatusBadge>
      </div>
      <p className="mt-3 flex items-baseline gap-1 text-3xl font-semibold text-foreground">
        {value}
        {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{range}</p>
      {spark && (
        <div className="mt-3 h-14">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spark} margin={{ top: 4, bottom: 0, left: 0, right: 0 }}>
              <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={2}
                fill={color}
                fillOpacity={0.12}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

/* ---------- AI recommendation card ---------- */

export function AIRecommendationCard({
  title,
  body,
  confidence,
  actions,
}: {
  title: string;
  body: string;
  confidence?: number | undefined;
  actions?: ReactNode | undefined;
}) {
  return (
    <article className="rounded-3xl border border-accent/25 bg-accent-soft p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Sparkles className="size-5" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {confidence !== undefined && (
              <StatusBadge tone="accent">{confidence}% confidence</StatusBadge>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{body}</p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Simulated AI output — prototype only, not medical advice.
          </p>
          {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </article>
  );
}

/* ---------- Quick action card ---------- */

export function QuickActionCard({
  label,
  description,
  icon: Icon,
  tone = "primary",
  to,
  onClick,
}: {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tone?: "primary" | "emergency" | "success" | "accent" | "warning" | undefined;
  to?: string | undefined;
  onClick?: () => void | undefined;
}) {
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    emergency: "bg-emergency-soft text-emergency",
    success: "bg-success-soft text-success",
    accent: "bg-accent-soft text-accent",
    warning: "bg-warning-soft text-warning-foreground",
  };
  const inner = (
    <>
      <span className={cn("grid size-11 place-items-center rounded-2xl", toneMap[tone])}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>
      </span>
      <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
    </>
  );
  const cls =
    "flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-4 text-left shadow-soft transition-all hover:shadow-lifted hover:-translate-y-0.5";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ---------- Notification card ---------- */

export function NotificationCard({ n }: { n: AppNotification }) {
  const tone =
    n.priority === "critical" ? "emergency" : n.priority === "high" ? "warning" : "primary";
  return (
    <article
      className={cn(
        "flex gap-3 rounded-3xl border border-border bg-card p-4 shadow-soft",
        !n.read && "border-primary/30 bg-primary-soft/30",
      )}
    >
      <span
        className={cn(
          "mt-0.5 size-2 shrink-0 rounded-full",
          tone === "emergency" ? "bg-emergency" : tone === "warning" ? "bg-warning" : "bg-primary",
        )}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
          <StatusBadge tone={tone}>{n.category}</StatusBadge>
          {!n.read && <StatusBadge tone="primary">New</StatusBadge>}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
        <p className="mt-1.5 text-[11px] text-muted-foreground">{n.time}</p>
      </div>
    </article>
  );
}

/* ---------- Timeline ---------- */

export function Timeline({
  steps,
}: {
  steps: { label: string; detail: string; time?: string; state: "done" | "active" | "pending" }[];
}) {
  return (
    <ol className="relative space-y-1">
      {steps.map((s, i) => (
        <li key={s.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-semibold",
                s.state === "done"
                  ? "border-success bg-success text-success-foreground"
                  : s.state === "active"
                    ? "border-emergency bg-emergency-soft text-emergency pulse-ring"
                    : "border-border bg-card text-muted-foreground",
              )}
            >
              {s.state === "done" ? "✓" : i + 1}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "my-1 w-0.5 flex-1 rounded-full",
                  s.state === "done" ? "bg-success/40" : "bg-border",
                )}
              />
            )}
          </div>
          <div className={cn("min-w-0 pb-5", s.state === "pending" && "opacity-60")}>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{s.label}</p>
              {s.time && <span className="text-[11px] text-muted-foreground">{s.time}</span>}
              {s.state === "active" && <StatusBadge tone="emergency" dot>In progress</StatusBadge>}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Map panel (mock visualisation) ---------- */

export function MapPanel({
  patientLabel,
  ambulanceLabel,
  hospitalLabel,
  progress = 45,
  etaMin,
  height = 320,
  markers = [],
}: {
  patientLabel: string;
  ambulanceLabel: string;
  hospitalLabel: string;
  progress?: number | undefined;
  etaMin?: number | undefined;
  height?: number | undefined;
  markers?: { label: string; x: number; y: number; tone: "primary" | "success" | "warning" }[];
}) {
  const clamped = Math.min(96, Math.max(4, progress));
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft"
      style={{ height }}
      role="img"
      aria-label={`Mock map: ${ambulanceLabel} en route from ${patientLabel} to ${hospitalLabel}`}
    >
      <svg className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0v44" fill="none" stroke="var(--color-border)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path
          d="M -20 78% Q 30% 62%, 50% 55% T 105% 20%"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M -20 78% Q 30% 62%, 50% 55% T 105% 20%"
          fill="none"
          stroke="var(--color-emergency)"
          strokeWidth="3"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute bottom-[22%] left-[8%] flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-soft">
        <span className="size-2 rounded-full bg-primary" /> {patientLabel}
      </span>

      <span
        className="absolute flex items-center gap-2 rounded-2xl border border-emergency/40 bg-card px-3 py-2 text-xs font-semibold text-emergency shadow-emergency transition-all duration-700"
        style={{ left: `${clamped}%`, top: `${58 - clamped * 0.32}%` }}
      >
        <AmbulanceIcon className="size-4" /> {ambulanceLabel}
      </span>

      <span className="absolute right-[6%] top-[12%] flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-soft">
        <Building2 className="size-4 text-success" /> {hospitalLabel}
      </span>

      {markers.map((m) => (
        <span
          key={m.label}
          className="absolute flex items-center gap-1.5 rounded-xl border border-border bg-card/90 px-2 py-1 text-[11px] text-muted-foreground shadow-soft"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              m.tone === "primary" ? "bg-primary" : m.tone === "success" ? "bg-success" : "bg-warning",
            )}
          />
          {m.label}
        </span>
      ))}

      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border glass-panel px-3 py-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
          <Navigation className="size-3.5 text-emergency" /> Live route · GPS locked
        </span>
        {etaMin !== undefined && (
          <StatusBadge tone="emergency" dot>
            ETA {etaMin} min
          </StatusBadge>
        )}
      </div>
      <span className="absolute right-3 top-3 rounded-xl bg-card/80 px-2 py-1 text-[10px] text-muted-foreground">
        Mock map · no external map API
      </span>
    </div>
  );
}

/* ---------- Activity list ---------- */

export function ActivityList({
  items,
}: {
  items: { title: string; detail: string; time: string }[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i.title + i.time} className="flex gap-3">
          <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-xl bg-surface text-muted-foreground">
            <Activity className="size-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{i.title}</p>
            <p className="text-xs text-muted-foreground">{i.detail}</p>
          </div>
          <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{i.time}</span>
        </li>
      ))}
    </ul>
  );
}
