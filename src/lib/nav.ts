import {
  Activity,
  Ambulance,
  BedDouble,
  Bell,
  Bot,
  Building2,
  FileText,
  Gauge,
  HeartPulse,
  LifeBuoy,
  ListOrdered,
  PhoneCall,
  Settings,
  Siren,
  Stethoscope,
  Users,
} from "lucide-react";
import type { Role } from "./hospinet-store";

export interface NavItem {
  to: string;
  label: string;
  icon: typeof Activity;
  tone?: "emergency";
}

export const primaryNav: NavItem[] = [
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/emergency", label: "Emergency", icon: Siren, tone: "emergency" },
  { to: "/ambulances", label: "Live Ambulances", icon: Ambulance },
  { to: "/hospitals", label: "Nearby Hospitals", icon: Building2 },
  { to: "/beds", label: "Bed Availability", icon: BedDouble },
  { to: "/records", label: "Medical Records", icon: FileText },
  { to: "/wearable", label: "Wearable Health", icon: HeartPulse },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
];

export const secondaryNav: NavItem[] = [
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/reports", label: "Reports", icon: Activity },
  { to: "/timeline", label: "Emergency Timeline", icon: ListOrdered },
  { to: "/contacts", label: "Emergency Contacts", icon: PhoneCall },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/support", label: "Support", icon: LifeBuoy },
];

export const roleWorkspaces: { role: Role; to: string; label: string }[] = [
  { role: "doctor", to: "/roles/doctor", label: "Doctor workspace" },
  { role: "hospital-admin", to: "/roles/hospital-admin", label: "Hospital admin" },
  { role: "ambulance-driver", to: "/roles/ambulance-driver", label: "Ambulance driver" },
  { role: "dispatcher", to: "/roles/dispatcher", label: "Dispatcher console" },
  { role: "system-admin", to: "/roles/monitoring", label: "AI monitoring centre" },
];

export const roleNavIcon = Users;

export const mobileNav: NavItem[] = [
  { to: "/", label: "Home", icon: Gauge },
  { to: "/hospitals", label: "Hospitals", icon: Building2 },
  { to: "/emergency", label: "SOS", icon: Siren, tone: "emergency" },
  { to: "/ambulances", label: "Tracking", icon: Ambulance },
  { to: "/assistant", label: "Assistant", icon: Bot },
];
