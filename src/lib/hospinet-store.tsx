import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { notificationService, type AppNotification } from "@/services";

export const EMERGENCY_STEPS = [
  { key: "created", label: "Emergency created", detail: "SOS received with GPS fix" },
  { key: "ai", label: "AI analysis", detail: "Vitals and symptoms triaged" },
  { key: "ambulance", label: "Ambulance assigned", detail: "Nearest capable unit dispatched" },
  { key: "driver", label: "Driver accepted", detail: "Crew acknowledged the run" },
  { key: "hospital", label: "Hospital selected", detail: "Best-match facility confirmed" },
  { key: "bed", label: "Bed reserved", detail: "Emergency bed held on arrival" },
  { key: "doctor", label: "Doctor notified", detail: "Specialist team on standby" },
  { key: "enroute", label: "Ambulance en route", detail: "Live tracking active" },
  { key: "arrived", label: "Ambulance arrived", detail: "Handover at emergency bay" },
  { key: "treatment", label: "Treatment started", detail: "Care team took over" },
] as const;

export type Role =
  | "patient"
  | "doctor"
  | "hospital-admin"
  | "ambulance-driver"
  | "dispatcher"
  | "system-admin";

export const ROLES: { id: Role; label: string; description: string }[] = [
  { id: "patient", label: "Patient", description: "Personal health & emergency" },
  { id: "doctor", label: "Doctor", description: "Incoming cases & patients" },
  { id: "hospital-admin", label: "Hospital Admin", description: "Beds, queue & analytics" },
  { id: "ambulance-driver", label: "Ambulance Driver", description: "Assigned run & navigation" },
  { id: "dispatcher", label: "Emergency Dispatcher", description: "Requests & assignment" },
  { id: "system-admin", label: "System Administrator", description: "AI monitoring centre" },
];

export interface TimelineEvent {
  key: string;
  label: string;
  detail: string;
  time: string;
}

interface StoreValue {
  emergencyActive: boolean;
  emergencyType: string | null;
  progress: number;
  events: TimelineEvent[];
  selectedHospitalId: string | null;
  reservedBeds: Record<string, string>;
  notifiedDoctors: string[];
  notifications: AppNotification[];
  unreadCount: number;
  role: Role;
  theme: "light" | "dark";
  language: string;
  triggerEmergency: (type: string) => void;
  advanceTo: (stepKey: (typeof EMERGENCY_STEPS)[number]["key"]) => void;
  selectHospital: (id: string, name: string) => void;
  reserveBed: (hospitalId: string, hospitalName: string, bedLabel: string) => void;
  notifyDoctor: (doctorId: string, doctorName: string) => void;
  resetEmergency: () => void;
  pushNotification: (n: Omit<AppNotification, "id" | "time" | "read">) => void;
  markAllRead: () => void;
  setRole: (r: Role) => void;
  toggleTheme: () => void;
  setLanguage: (l: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const clock = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

const stepIndex = (key: string) => EMERGENCY_STEPS.findIndex((s) => s.key === key);

export function HospinetProvider({ children }: { children: ReactNode }) {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string | null>(null);
  const [progress, setProgress] = useState(-1);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [reservedBeds, setReservedBeds] = useState<Record<string, string>>({});
  const [notifiedDoctors, setNotifiedDoctors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    notificationService.list(),
  );
  const [role, setRole] = useState<Role>("patient");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const stored = window.localStorage.getItem("hospinet-theme");
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("hospinet-theme", theme);
  }, [theme]);

  const pushNotification = useCallback(
    (n: Omit<AppNotification, "id" | "time" | "read">) => {
      setNotifications((prev) => [
        { ...n, id: `NT-${Math.random().toString(36).slice(2, 7)}`, time: clock(), read: false },
        ...prev,
      ]);
    },
    [],
  );

  const advanceTo = useCallback((key: (typeof EMERGENCY_STEPS)[number]["key"]) => {
    const target = stepIndex(key);
    setProgress((prev) => {
      if (target <= prev) return prev;
      const added = EMERGENCY_STEPS.slice(prev + 1, target + 1).map((s) => ({
        key: s.key,
        label: s.label,
        detail: s.detail,
        time: clock(),
      }));
      setEvents((e) => [...e, ...added]);
      return target;
    });
  }, []);

  const triggerEmergency = useCallback(
    (type: string) => {
      setEmergencyActive(true);
      setEmergencyType(type);
      setProgress(-1);
      setEvents([]);
      advanceTo("ai");
      pushNotification({
        title: `Emergency created — ${type}`,
        body: "Location shared with dispatch. AI triage in progress.",
        category: "emergency",
        priority: "critical",
      });
      window.setTimeout(() => advanceTo("driver"), 1400);
      window.setTimeout(
        () =>
          pushNotification({
            title: "Ambulance AMB-204 assigned",
            body: "Cardiac unit dispatched. Driver Suresh Kumar accepted the run.",
            category: "emergency",
            priority: "critical",
          }),
        1500,
      );
    },
    [advanceTo, pushNotification],
  );

  const selectHospital = useCallback(
    (id: string, name: string) => {
      setSelectedHospitalId(id);
      advanceTo("hospital");
      pushNotification({
        title: `${name} selected`,
        body: "Receiving facility confirmed and records shared.",
        category: "hospital",
        priority: "high",
      });
    },
    [advanceTo, pushNotification],
  );

  const reserveBed = useCallback(
    (hospitalId: string, hospitalName: string, bedLabel: string) => {
      setReservedBeds((prev) => ({ ...prev, [hospitalId]: bedLabel }));
      setSelectedHospitalId((prev) => prev ?? hospitalId);
      advanceTo("bed");
      pushNotification({
        title: `${bedLabel} reserved at ${hospitalName}`,
        body: "Bed held for 30 minutes pending patient arrival.",
        category: "hospital",
        priority: "high",
      });
    },
    [advanceTo, pushNotification],
  );

  const notifyDoctor = useCallback(
    (doctorId: string, doctorName: string) => {
      setNotifiedDoctors((prev) => (prev.includes(doctorId) ? prev : [...prev, doctorId]));
      advanceTo("doctor");
      pushNotification({
        title: `${doctorName} notified`,
        body: "Specialist acknowledged and is preparing for handover.",
        category: "doctor",
        priority: "high",
      });
    },
    [advanceTo, pushNotification],
  );

  const resetEmergency = useCallback(() => {
    setEmergencyActive(false);
    setEmergencyType(null);
    setProgress(-1);
    setEvents([]);
    setSelectedHospitalId(null);
    setReservedBeds({});
    setNotifiedDoctors([]);
  }, []);

  const markAllRead = useCallback(
    () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
    [],
  );

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const value = useMemo<StoreValue>(
    () => ({
      emergencyActive,
      emergencyType,
      progress,
      events,
      selectedHospitalId,
      reservedBeds,
      notifiedDoctors,
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      role,
      theme,
      language,
      triggerEmergency,
      advanceTo,
      selectHospital,
      reserveBed,
      notifyDoctor,
      resetEmergency,
      pushNotification,
      markAllRead,
      setRole,
      toggleTheme,
      setLanguage,
    }),
    [
      emergencyActive,
      emergencyType,
      progress,
      events,
      selectedHospitalId,
      reservedBeds,
      notifiedDoctors,
      notifications,
      role,
      theme,
      language,
      triggerEmergency,
      advanceTo,
      selectHospital,
      reserveBed,
      notifyDoctor,
      resetEmergency,
      pushNotification,
      markAllRead,
      toggleTheme,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useHospinet() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useHospinet must be used inside HospinetProvider");
  return ctx;
}
