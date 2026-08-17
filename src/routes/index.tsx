import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Ambulance,
  BedDouble,
  Bot,
  Building2,
  HeartPulse,
  Siren,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { PageHeader, SectionCard } from "@/components/app/primitives";
import {
  ActivityList,
  AIRecommendationCard,
  ChartCard,
  HospitalCard,
  MapPanel,
  MetricCard,
  QuickActionCard,
  Timeline,
} from "@/components/app/cards";
import { Button } from "@/components/app/ui";
import { StatusBadge } from "@/components/app/StatusBadge";
import { EMERGENCY_STEPS, useHospinet } from "@/lib/hospinet-store";
import {
  ambulanceService,
  environmentService,
  hospitalService,
  patientService,
  wearableService,
} from "@/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HOSPI-NET Dashboard — Emergency Health Command Centre" },
      {
        name: "description",
        content:
          "Live vitals, nearby hospital beds, ambulance ETA and AI triage in one healthcare emergency coordination dashboard.",
      },
      { property: "og:title", content: "HOSPI-NET Dashboard — Emergency Health Command Centre" },
      {
        property: "og:description",
        content:
          "Live vitals, nearby hospital beds, ambulance ETA and AI triage in one healthcare emergency coordination dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { emergencyActive, emergencyType, progress, events, selectedHospitalId, reservedBeds, selectHospital, reserveBed } =
    useHospinet();
  const me = patientService.me();
  const wearable = wearableService.data();
  const env = environmentService.current();
  const recommended = hospitalService.recommended().slice(0, 3);
  const top = recommended[0]!;
  const ambulance = ambulanceService.list()[0]!;

  const steps = EMERGENCY_STEPS.map((s, i) => ({
    label: s.label,
    detail: s.detail,
    time: events.find((e) => e.key === s.key)?.time,
    state: (i <= progress ? "done" : i === progress + 1 && emergencyActive ? "active" : "pending") as
      | "done"
      | "active"
      | "pending",
  }));

  return (
    <>
      <PageHeader
        eyebrow={`Good evening, ${me.name.split(" ")[0]}`}
        title="Emergency command centre"
        description={`${env.location} · GPS accurate to ${env.gpsAccuracyM} m · ${env.weather}. Everything below runs on prototype data.`}
        tone={emergencyActive ? "emergency" : "default"}
        actions={
          <>
            <StatusBadge tone={emergencyActive ? "emergency" : "success"} dot>
              {emergencyActive ? `Live · ${emergencyType}` : "No active emergency"}
            </StatusBadge>
            <Link to="/emergency">
              <Button variant="emergency">
                <Siren className="size-4" />
                {emergencyActive ? "Open emergency" : "Trigger SOS"}
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Health score"
          value={me.healthScore}
          unit="/100"
          icon={Activity}
          tone="success"
          progress={me.healthScore}
          hint="Composite of vitals, adherence & sleep"
        />
        <MetricCard
          label="Heart rate"
          value={wearable.live.hr}
          unit="bpm"
          icon={HeartPulse}
          tone="emergency"
          hint="Sustained tachycardia detected"
        />
        <MetricCard
          label="Blood oxygen"
          value={wearable.live.spo2}
          unit="%"
          icon={Activity}
          tone="warning"
          hint="Below your 95% baseline"
        />
        <MetricCard
          label="Nearest ICU bed"
          value={top.icuBeds.available}
          unit="free"
          icon={BedDouble}
          tone="primary"
          hint={`${top.name} · ${top.distanceKm} km`}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <AIRecommendationCard
            title="AI triage recommendation"
            body={`${top.name} — ${top.aiReason}. Estimated door-to-care time ${top.etaMin + top.waitingTimeMin} minutes.`}
            confidence={top.aiScore}
            actions={
              <>
                <Button
                  size="sm"
                  onClick={() => selectHospital(top.id, top.name)}
                >
                  Select hospital
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    reserveBed(top.id, top.name, "Cardiac ICU bed")
                  }
                >
                  Reserve ICU bed
                </Button>
              </>
            }
          />

          <SectionCard
            title="Live ambulance tracking"
            description={`${ambulance.vehicleNo} · ${ambulance.driver} · traffic ${ambulance.traffic}`}
            icon={Ambulance}
            action={
              <Link to="/ambulances">
                <Button size="sm" variant="ghost">
                  Open tracking
                </Button>
              </Link>
            }
          >
            <MapPanel
              patientLabel={env.location}
              ambulanceLabel={ambulance.vehicleNo}
              hospitalLabel={top.name}
              progress={emergencyActive ? 62 : 30}
              etaMin={ambulance.etaMin}
              height={280}
            />
          </SectionCard>

          <ChartCard
            title="Vitals today"
            description="Heart rate and blood oxygen trend from your wearable"
            data={wearable.today}
            xKey="t"
            series={[
              { key: "hr", label: "Heart rate", color: "var(--color-emergency)" },
              { key: "spo2", label: "SpO₂", color: "var(--color-primary)" },
            ]}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {recommended.slice(0, 2).map((h) => (
              <HospitalCard
                key={h.id}
                hospital={h}
                recommended={h.id === top.id}
                selected={selectedHospitalId === h.id}
                reservedBed={reservedBeds[h.id]}
                onSelect={() => selectHospital(h.id, h.name)}
                onReserve={() => reserveBed(h.id, h.name, "Emergency bed")}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionCard title="Quick actions" icon={Sparkles} bodyClassName="grid gap-3">
            <QuickActionCard
              label="Trigger SOS"
              description="10-step coordinated emergency"
              icon={Siren}
              tone="emergency"
              to="/emergency"
            />
            <QuickActionCard
              label="Find hospitals"
              description="AI-ranked, bed-aware"
              icon={Building2}
              to="/hospitals"
            />
            <QuickActionCard
              label="Bed availability"
              description="Live ICU & emergency beds"
              icon={BedDouble}
              tone="warning"
              to="/beds"
            />
            <QuickActionCard
              label="Ask the assistant"
              description="Guidance during emergencies"
              icon={Bot}
              tone="accent"
              to="/assistant"
            />
            <QuickActionCard
              label="Consult a doctor"
              description="Availability & specialisation"
              icon={Stethoscope}
              tone="success"
              to="/doctors"
            />
          </SectionCard>

          <SectionCard
            title="Emergency timeline"
            description={emergencyActive ? "Live coordination progress" : "Starts when SOS is triggered"}
            action={
              <Link to="/timeline">
                <Button size="sm" variant="ghost">
                  All steps
                </Button>
              </Link>
            }
          >
            <Timeline steps={steps.slice(0, 6)} />
          </SectionCard>

          <SectionCard title="Recent activity">
            <ActivityList
              items={[
                { title: "Wearable alert", detail: "Tachycardia 128 bpm", time: "23:40" },
                { title: "Records synced", detail: "ABHA records shared", time: "23:45" },
                { title: "Cardiology review", detail: "Medication adjusted", time: "05 Aug" },
                { title: "Lipid profile", detail: "LDL flagged high", time: "02 Aug" },
              ]}
            />
          </SectionCard>
        </div>
      </div>
    </>
  );
}
