import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, HeartPulse, Phone, Siren, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/app/primitives";
import { AIRecommendationCard, HospitalCard, MapPanel, Timeline } from "@/components/app/cards";
import { Button, DataRow, Textarea, Field, Select } from "@/components/app/ui";
import { StatusBadge } from "@/components/app/StatusBadge";
import { EMERGENCY_STEPS, useHospinet } from "@/lib/hospinet-store";
import {
  ambulanceService,
  environmentService,
  hospitalService,
  patientService,
  wearableService,
} from "@/services";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency SOS Flow — HOSPI-NET" },
      {
        name: "description",
        content:
          "Trigger an SOS and follow the 10-step coordination flow: AI triage, ambulance dispatch, hospital match, bed reservation and doctor handover.",
      },
      { property: "og:title", content: "Emergency SOS Flow — HOSPI-NET" },
      {
        property: "og:description",
        content:
          "Trigger an SOS and follow the 10-step coordination flow from AI triage to doctor handover.",
      },
    ],
  }),
  component: EmergencyPage,
});

const TYPES = [
  "Suspected cardiac event",
  "Road traffic accident",
  "Severe breathing difficulty",
  "Stroke symptoms",
  "Serious fall / head injury",
  "Poisoning or overdose",
];

function EmergencyPage() {
  const {
    emergencyActive,
    emergencyType,
    progress,
    events,
    selectedHospitalId,
    reservedBeds,
    triggerEmergency,
    advanceTo,
    selectHospital,
    reserveBed,
    resetEmergency,
  } = useHospinet();

  const [type, setType] = useState(TYPES[0]!);
  const [notes, setNotes] = useState("");
  const me = patientService.me();
  const env = environmentService.current();
  const wearable = wearableService.data();
  const hospitals = hospitalService.recommended().slice(0, 3);
  const ambulance = ambulanceService.list()[0]!;

  const steps = EMERGENCY_STEPS.map((s, i) => ({
    label: s.label,
    detail: s.detail,
    time: events.find((e) => e.key === s.key)?.time,
    state: (i <= progress
      ? "done"
      : i === progress + 1 && emergencyActive
        ? "active"
        : "pending") as "done" | "active" | "pending",
  }));

  return (
    <>
      <PageHeader
        eyebrow="Emergency"
        title={emergencyActive ? `Live emergency · ${emergencyType}` : "Trigger an emergency"}
        description="One tap shares your location, vitals and records with dispatch, the ambulance crew and the receiving hospital."
        tone="emergency"
        actions={
          emergencyActive ? (
            <>
              <StatusBadge tone="emergency" dot>
                Step {Math.max(progress + 1, 1)} of 10
              </StatusBadge>
              <Button variant="outline" onClick={resetEmergency}>
                End simulation
              </Button>
            </>
          ) : (
            <StatusBadge tone="success" dot>
              Standing by
            </StatusBadge>
          )
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {!emergencyActive ? (
            <SectionCard
              title="SOS details"
              description="Confirm the emergency type — everything else is auto-filled from your profile."
              icon={Siren}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Emergency type">
                  <Select value={type} onChange={(e) => setType(e.target.value)}>
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Location" hint={`GPS accuracy ${env.gpsAccuracyM} m`}>
                  <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground">
                    {env.location}
                  </div>
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Notes for the crew (optional)">
                  <Textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Symptoms, onset time, anything the paramedics should know…"
                  />
                </Field>
              </div>

              <button
                onClick={() => {
                  triggerEmergency(type);
                  toast.error("SOS sent — dispatch notified", {
                    description: "Prototype simulation: AI triage and ambulance assignment running.",
                  });
                }}
                className="pulse-ring mt-6 flex w-full flex-col items-center gap-2 rounded-3xl bg-emergency px-6 py-8 text-emergency-foreground shadow-emergency transition-transform active:scale-[0.98]"
              >
                <Siren className="size-9" />
                <span className="text-lg font-semibold">Send SOS now</span>
                <span className="text-xs opacity-90">
                  Shares location, vitals and medical records instantly
                </span>
              </button>
            </SectionCard>
          ) : (
            <>
              <SectionCard
                title="Coordination progress"
                description="Each step advances as crews and hospitals acknowledge."
                icon={AlertTriangle}
                action={
                  <Link to="/timeline">
                    <Button size="sm" variant="ghost">
                      Full timeline
                    </Button>
                  </Link>
                }
              >
                <Timeline steps={steps} />
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => advanceTo("enroute")}>
                    Mark ambulance en route
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => advanceTo("arrived")}>
                    Mark arrived
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => advanceTo("treatment")}>
                    Treatment started
                  </Button>
                </div>
              </SectionCard>

              <SectionCard title="Live route" description={`${ambulance.vehicleNo} · ETA ${ambulance.etaMin} min`}>
                <MapPanel
                  patientLabel={env.location}
                  ambulanceLabel={ambulance.vehicleNo}
                  hospitalLabel={
                    hospitals.find((h) => h.id === selectedHospitalId)?.name ?? hospitals[0]!.name
                  }
                  progress={Math.min(90, 25 + Math.max(progress, 0) * 7)}
                  etaMin={ambulance.etaMin}
                />
              </SectionCard>
            </>
          )}

          <AIRecommendationCard
            title="AI triage summary"
            body={`Vitals HR ${wearable.live.hr} bpm, SpO₂ ${wearable.live.spo2}%, BP ${wearable.live.bpSys}/${wearable.live.bpDia}. Recommended destination: ${hospitals[0]!.name} — ${hospitals[0]!.aiReason}.`}
            confidence={hospitals[0]!.aiScore}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {hospitals.map((h) => (
              <HospitalCard
                key={h.id}
                hospital={h}
                recommended={h.id === hospitals[0]!.id}
                selected={selectedHospitalId === h.id}
                reservedBed={reservedBeds[h.id]}
                onSelect={() => selectHospital(h.id, h.name)}
                onReserve={() => reserveBed(h.id, h.name, "Emergency bed")}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionCard title="Patient snapshot" icon={HeartPulse}>
            <DataRow label="Name" value={me.name} />
            <DataRow label="Age / gender" value={`${me.age} · ${me.gender}`} />
            <DataRow label="Blood group" value={me.bloodGroup} />
            <DataRow label="Allergies" value={me.allergies.join(", ")} />
            <DataRow label="Conditions" value={me.conditions.join(", ")} />
            <DataRow label="ABHA ID" value={me.abhaId} />
            <DataRow label="Insurance" value={me.insurance} />
          </SectionCard>

          <SectionCard title="Live vitals" icon={Sparkles}>
            <DataRow label="Heart rate" value={`${wearable.live.hr} bpm`} />
            <DataRow label="SpO₂" value={`${wearable.live.spo2}%`} />
            <DataRow label="Blood pressure" value={`${wearable.live.bpSys}/${wearable.live.bpDia}`} />
            <DataRow label="Respiration" value={`${wearable.live.resp} /min`} />
            <DataRow label="Temperature" value={`${wearable.live.temp} °C`} />
          </SectionCard>

          <SectionCard title="Emergency contacts" icon={Phone}>
            <div className="space-y-3">
              {me.emergencyContacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.relation} · {c.phone}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={() => toast.success(`Calling ${c.name} (prototype)`)}
                  >
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
