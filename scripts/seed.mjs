/**
 * Seed script — puebla la BD con datos de prueba realistas.
 * Credenciales:  maria@test.com / Test1234!   (holder)
 *                dr.mendoza@test.com / Test1234! (doctor)
 *
 * Uso:
 *   SUPABASE_URL=<url> SUPABASE_SERVICE_KEY=<service_role_key> node scripts/seed.mjs
 *
 *   O con el .env del backend:
 *   cd apps/backend && node ../../scripts/seed.mjs
 */

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ─── Config ──────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, "../apps/backend/.env");
  try {
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const [k, ...rest] = line.split("=");
      if (k && rest.length) process.env[k.trim()] = rest.join("=").trim();
    }
  } catch {
    // env vars already set externally
  }
}

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY ?? process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌  Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

// ─── UUIDs fijos (para idempotencia) ─────────────────────────────────────────

const ID = {
  holder: "00000000-0000-0000-0000-000000000001",
  doctor: "00000000-0000-0000-0000-000000000002",
  sofia: "00000000-0000-0000-0001-000000000001",
  mateo: "00000000-0000-0000-0001-000000000002",
  apptPast: "00000000-0000-0000-0002-000000000001",
  apptNext: "00000000-0000-0000-0002-000000000002",
  treatment1: "00000000-0000-0000-0003-000000000001",
  step1: "00000000-0000-0000-0004-000000000001",
  med1: "00000000-0000-0000-0005-000000000001",
  allergy1: "00000000-0000-0000-0006-000000000001",
  vaccine1: "00000000-0000-0000-0007-000000000001",
  vital1: "00000000-0000-0000-0008-000000000001",
  event1: "00000000-0000-0000-0009-000000000001",
  event2: "00000000-0000-0000-0009-000000000002",
  event3: "00000000-0000-0000-0009-000000000003",
  event4: "00000000-0000-0000-0009-000000000004",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

function dateOnly(isoDate) {
  return isoDate.split("T")[0];
}

async function upsert(table, data, conflict = "id") {
  const { error } = await supabase
    .from(table)
    .upsert(data, { onConflict: conflict });
  if (error) throw new Error(`[${table}] ${error.message}`);
  console.log(`  ✓ ${table}`);
}

// ─── Seed ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🌱  Iniciando seed de Cuidabox…\n");

  const hash = await bcrypt.hash("Test1234!", 10);

  // Users
  await upsert("users", [
    {
      id: ID.holder,
      name: "María García",
      email: "maria@test.com",
      password_hash: hash,
      role: "holder",
    },
    {
      id: ID.doctor,
      name: "Carlos Mendoza",
      email: "dr.mendoza@test.com",
      password_hash: hash,
      role: "doctor",
      specialty_key: "pediatrics",
    },
  ]);

  // Patients
  await upsert("patients", [
    {
      id: ID.sofia,
      name: "Sofía García",
      birthdate: "2017-03-14",
      gender: "female",
      blood_type: "A+",
      notes:
        "Alérgica a la penicilina. Le gusta que le cuenten cuentos antes de tomar medicamentos.",
      created_by: ID.holder,
    },
    {
      id: ID.mateo,
      name: "Mateo García",
      birthdate: "2020-08-22",
      gender: "male",
      blood_type: "O+",
      notes: "Nació prematuro. Control de peso mensual.",
      created_by: ID.holder,
    },
  ]);

  // Patient ↔ Holder
  await upsert(
    "patient_holders",
    [
      {
        patient_id: ID.sofia,
        user_id: ID.holder,
        relationship: "parent",
        is_primary: true,
      },
      {
        patient_id: ID.mateo,
        user_id: ID.holder,
        relationship: "parent",
        is_primary: true,
      },
    ],
    "patient_id, user_id",
  );

  // Patient ↔ Doctor
  await upsert("patient_doctors", [
    {
      id: "00000000-0000-0000-000a-000000000001",
      patient_id: ID.sofia,
      user_id: ID.doctor,
      status: "active",
      invited_by: ID.holder,
      access_from: daysAgo(30),
    },
  ]);

  // Appointments
  await upsert("appointments", [
    {
      id: ID.apptPast,
      patient_id: ID.sofia,
      doctor_id: ID.doctor,
      doctor_name: "Dr. Carlos Mendoza",
      title: "Consulta pediátrica",
      scheduled_at: daysAgo(14),
      status: "completed",
      notes:
        "Diagnóstico: faringitis bacteriana. Se inicia tratamiento con amoxicilina.",
      created_by: ID.holder,
    },
    {
      id: ID.apptNext,
      patient_id: ID.sofia,
      doctor_id: ID.doctor,
      doctor_name: "Dr. Carlos Mendoza",
      title: "Control de seguimiento",
      scheduled_at: daysFromNow(1),
      status: "scheduled",
      notes: "Verificar evolución del tratamiento con amoxicilina.",
      created_by: ID.holder,
    },
  ]);

  // Treatment
  await upsert("treatments", [
    {
      id: ID.treatment1,
      patient_id: ID.sofia,
      doctor_id: ID.doctor,
      appointment_id: ID.apptPast,
      title: "Amoxicilina — Faringitis bacteriana",
      start_date: dateOnly(daysAgo(3)),
      end_date: dateOnly(daysFromNow(4)),
      status: "active",
      created_by: ID.holder,
    },
  ]);

  // Treatment step
  await upsert("treatment_steps", [
    {
      id: ID.step1,
      treatment_id: ID.treatment1,
      order: 1,
      type: "medication",
      title: "Amoxicilina 7 ml",
      description: "Dar con o sin comida. Agitar el frasco antes de usar.",
      start_offset_days: 0,
      duration_days: 7,
    },
  ]);

  // Medication
  await upsert("treatment_step_medications", [
    {
      id: ID.med1,
      step_id: ID.step1,
      medication_name: "Amoxicilina",
      dose: 7,
      unit: "ml",
      frequency: "cada 8 horas",
      times_of_day: ["07:00", "15:00", "23:00"],
    },
  ]);

  // Allergies
  await upsert("allergies", [
    {
      id: ID.allergy1,
      patient_id: ID.sofia,
      name: "Penicilina",
      type: "drug",
      severity: "severe",
      notes: "Reacción anafiláctica documentada a los 2 años.",
    },
  ]);

  // Vaccines
  await upsert("vaccines", [
    {
      id: ID.vaccine1,
      patient_id: ID.sofia,
      name: "DTP — Difteria, Tétanos y Pertussis",
      dose_number: 4,
      administered_at: daysAgo(32),
      administered_by: "Dr. Carlos Mendoza",
      notes: "Refuerzo de los 7 años.",
    },
  ]);

  // Vitals
  await upsert("vitals", [
    {
      id: ID.vital1,
      patient_id: ID.sofia,
      recorded_by: ID.doctor,
      weight_kg: 22.4,
      height_cm: 118,
      temperature_c: 36.8,
      heart_rate: 88,
      recorded_at: daysAgo(14),
      notes: "Toma en consulta pediátrica.",
    },
  ]);

  // Events (timeline)
  await upsert("events", [
    {
      id: ID.event1,
      patient_id: ID.sofia,
      created_by: ID.holder,
      type: "vaccine",
      occurred_at: daysAgo(32),
      payload: { name: "DTP — Difteria, Tétanos y Pertussis", dose_number: 4 },
    },
    {
      id: ID.event2,
      patient_id: ID.sofia,
      created_by: ID.holder,
      type: "symptom",
      occurred_at: daysAgo(5),
      payload: {
        description: "Fiebre 38.5°C y dolor de garganta",
        severity: "moderate",
        temperature_c: 38.5,
      },
    },
    {
      id: ID.event3,
      patient_id: ID.sofia,
      created_by: ID.holder,
      type: "visit",
      occurred_at: daysAgo(14),
      payload: {
        title: "Consulta pediátrica",
        doctor_name: "Dr. Carlos Mendoza",
        diagnosis: "Faringitis bacteriana",
      },
    },
    {
      id: ID.event4,
      patient_id: ID.sofia,
      created_by: ID.holder,
      type: "medication_given",
      occurred_at: daysAgo(2),
      payload: {
        medication_name: "Amoxicilina",
        dose: 7,
        unit: "ml",
        time: "07:00",
      },
    },
  ]);

  console.log("\n✅  Seed completado.\n");
  console.log("  📧  maria@test.com     /  Test1234!  (holder)");
  console.log("  📧  dr.mendoza@test.com / Test1234!  (doctor)");
  console.log("\n  Pacientes:");
  console.log(
    "  → Sofía García  (7 años, A+, 1 alergia, 1 tratamiento activo)",
  );
  console.log("  → Mateo García  (4 años, O+)\n");
}

main().catch((e) => {
  console.error("❌ ", e.message);
  process.exit(1);
});
