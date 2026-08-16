import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Mic,
  Moon,
  Search,
  Siren,
  Sun,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { mobileNav, primaryNav, roleWorkspaces, secondaryNav } from "@/lib/nav";
import { ROLES, useHospinet } from "@/lib/hospinet-store";
import { patientService } from "@/services";
import { Avatar, IconButton, Input, Select } from "./ui";
import { StatusBadge } from "./StatusBadge";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path
            d="M12 3v18M3 12h18"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block text-sm font-semibold tracking-tight text-foreground">
            HOSPI-NET
          </span>
          <span className="block text-[11px] text-muted-foreground">
            Emergency Coordination
          </span>
        </span>
      )}
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const { role, setRole } = useHospinet();
  const [rolesOpen, setRolesOpen] = useState(false);

  const item = (to: string, label: string, Icon: typeof Bell, tone?: string) => (
    <Link
      key={to}
      to={to}
      onClick={onNavigate}
      activeOptions={{ exact: to === "/" }}
      activeProps={{
        className: cn(
          "bg-sidebar-accent text-sidebar-accent-foreground",
          tone === "emergency" && "bg-emergency-soft text-emergency",
        ),
      }}
      inactiveProps={{ className: "text-muted-foreground hover:bg-surface hover:text-foreground" }}
      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors"
    >
      <Icon className={cn("size-4.5 shrink-0", tone === "emergency" && "text-emergency")} />
      <span className="truncate">{label}</span>
    </Link>
  );

  return (
    <nav className="flex flex-col gap-1" aria-label="Main navigation">
      {primaryNav.map((n) => item(n.to, n.label, n.icon, n.tone))}

      <p className="mt-4 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Operations
      </p>
      {secondaryNav.map((n) => item(n.to, n.label, n.icon))}

      <p className="mt-4 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Workspaces
      </p>
      <button
        onClick={() => setRolesOpen((v) => !v)}
        aria-expanded={rolesOpen}
        className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      >
        <Users className="size-4.5" />
        <span className="flex-1 text-left">Role workspaces</span>
        <ChevronDown className={cn("size-4 transition-transform", rolesOpen && "rotate-180")} />
      </button>
      {rolesOpen && (
        <div className="ml-4 flex flex-col gap-1 border-l border-border pl-3">
          {roleWorkspaces.map((w) => (
            <Link
              key={w.to}
              to={w.to}
              onClick={() => {
                setRole(w.role);
                onNavigate?.();
              }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-xl px-2 py-2 text-sm transition-colors"
            >
              {w.label}
            </Link>
          ))}
        </div>
      )}
      <p className="mt-2 px-3 text-xs text-muted-foreground">
        Active role: <span className="font-medium text-foreground">{ROLES.find((r) => r.id === role)?.label}</span>
      </p>
    </nav>
  );
}

function SosButton({ className }: { className?: string }) {
  const { emergencyActive } = useHospinet();
  return (
    <Link
      to="/emergency"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl bg-emergency px-4 text-sm font-semibold text-emergency-foreground shadow-emergency transition-transform active:scale-95",
        emergencyActive && "pulse-ring",
        className,
      )}
    >
      <Siren className="size-4" />
      {emergencyActive ? "Emergency live" : "SOS"}
    </Link>
  );
}

function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { unreadCount, theme, toggleTheme, language, setLanguage, role, setRole } = useHospinet();
  const me = patientService.me();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 border-b border-border glass-panel">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 lg:px-8">
        <button
          onClick={onOpenMenu}
          aria-label="Open navigation"
          className="grid size-10 place-items-center rounded-2xl border border-border bg-card text-muted-foreground lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div className="lg:hidden">
          <Logo compact />
        </div>

        <form
          className="relative hidden flex-1 max-w-md md:block"
          onSubmit={(e) => {
            e.preventDefault();
            toast.info("Prototype search", {
              description: query
                ? `No live index yet — "${query}" would search hospitals, doctors and records.`
                : "Type a hospital, doctor or record to search.",
            });
          }}
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hospitals, doctors, records…"
            className="pl-11"
            aria-label="Global search"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            aria-label="Switch role"
            className="hidden h-10 w-40 xl:block"
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </Select>

          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Language"
            className="hidden h-10 w-28 lg:block"
          >
            {["English", "हिन्दी", "தமிழ்", "తెలుగు", "বাংলা"].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>

          <IconButton
            label="Voice assistant"
            className="hidden sm:grid"
            onClick={() =>
              toast.success("Voice assistant listening (prototype)", {
                description: 'Try: "Find the nearest hospital with an ICU bed."',
              })
            }
          >
            <Mic className="size-4.5" />
          </IconButton>

          <IconButton
            label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </IconButton>

          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-2xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bell className="size-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-emergency px-1 text-[10px] font-semibold text-emergency-foreground">
                {unreadCount}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2 rounded-2xl border border-border bg-card p-1 pr-3 transition-colors hover:bg-surface"
          >
            <Avatar name={me.name} />
            <span className="hidden min-w-0 text-left sm:block">
              <span className="block truncate text-xs font-semibold text-foreground">{me.name}</span>
              <span className="block text-[11px] text-muted-foreground">{me.bloodGroup} · {me.id}</span>
            </span>
          </Link>

          <SosButton className="hidden h-10 sm:inline-flex" />
        </div>
      </div>
    </header>
  );
}

function EmergencyRibbon() {
  const { emergencyActive, emergencyType, progress } = useHospinet();
  if (!emergencyActive) return null;
  return (
    <Link
      to="/timeline"
      className="block border-b border-emergency/30 bg-emergency-soft px-4 py-2 text-center text-xs font-medium text-emergency lg:px-8"
    >
      Live emergency · {emergencyType} · step {Math.max(progress + 1, 1)} of 10 — view timeline
    </Link>
  );
}

function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-border glass-panel pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around">
        {mobileNav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            activeProps={{
              className: n.tone === "emergency" ? "text-emergency" : "text-primary",
            }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
          >
            {n.tone === "emergency" ? (
              <span className="grid size-9 place-items-center rounded-2xl bg-emergency text-emergency-foreground shadow-emergency">
                <n.icon className="size-5" />
              </span>
            ) : (
              <n.icon className="size-5" />
            )}
            {n.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col gap-6 border-r border-border bg-sidebar px-4 py-6 lg:flex">
          <Logo />
          <div className="flex-1 overflow-y-auto pr-1">
            <NavList />
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <StatusBadge tone="success" dot>
              All systems nominal
            </StatusBadge>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Prototype build · mock data. Backend coordination not connected.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <TopBar onOpenMenu={() => setDrawer(true)} />
          <EmergencyRibbon />
          <main className="mx-auto w-full max-w-[1280px] px-4 pb-28 pt-6 lg:px-8 lg:pb-12">
            {children}
          </main>
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[300px] max-w-[85vw] flex-col gap-5 overflow-y-auto bg-sidebar p-4">
            <div className="flex items-center justify-between">
              <Logo />
              <IconButton label="Close navigation" onClick={() => setDrawer(false)}>
                <X className="size-4.5" />
              </IconButton>
            </div>
            <NavList onNavigate={() => setDrawer(false)} />
            <SosButton className="h-12" />
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
