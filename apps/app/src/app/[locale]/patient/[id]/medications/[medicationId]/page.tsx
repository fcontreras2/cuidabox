import MedicationDetail from "@/modules/patient/pages/MedicationDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ medicationId: string }>;
}) {
  const { medicationId } = await params;
  return <MedicationDetail id={medicationId} />;
}
