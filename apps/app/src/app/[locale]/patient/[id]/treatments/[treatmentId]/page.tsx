import TreatmentDetail from "@/modules/patient/pages/TreatmentDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ treatmentId: string }>;
}) {
  const { treatmentId } = await params;
  return <TreatmentDetail id={treatmentId} />;
}
