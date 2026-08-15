/**
 * Service boundary. UI imports from here only.
 * Swap the mock implementations for real API calls later without touching components.
 */
import * as mock from "./mock/data";

export type {
  Ambulance,
  AppNotification,
  Doctor,
  EmergencyCase,
  Hospital,
  Patient,
  Severity,
} from "./mock/data";

export const hospitalService = {
  list: () => mock.hospitals,
  get: (id: string) => mock.hospitals.find((h) => h.id === id),
  recommended: () => [...mock.hospitals].sort((a, b) => b.aiScore - a.aiScore),
  load: () => mock.hospitalLoad,
};

export const doctorService = {
  list: () => mock.doctors,
  get: (id: string) => mock.doctors.find((d) => d.id === id),
  byHospital: (hospitalId: string) => mock.doctors.filter((d) => d.hospitalId === hospitalId),
};

export const ambulanceService = {
  list: () => mock.ambulances,
  get: (id: string) => mock.ambulances.find((a) => a.id === id),
};

export const emergencyService = {
  list: () => mock.emergencies,
  active: () => mock.emergencies[0],
  history: () => mock.emergencyHistory,
  queue: () => mock.patientQueue,
};

export const patientService = {
  me: () => mock.patient,
  labReports: () => mock.labReports,
  prescriptions: () => mock.prescriptions,
  vaccinations: () => mock.vaccinations,
  timeline: () => mock.medicalTimeline,
  visits: () => mock.hospitalVisits,
};

export const wearableService = {
  data: () => mock.wearable,
};

export const notificationService = {
  list: () => mock.notifications,
};

export const monitoringService = {
  criticalPatients: () => mock.criticalPatients,
};

export const environmentService = {
  current: () => mock.environment,
};

export const assistantService = {
  suggestions: () => mock.aiSuggestions,
  reply: (question: string) => mock.aiResponses[question] ?? mock.aiFallback,
};
