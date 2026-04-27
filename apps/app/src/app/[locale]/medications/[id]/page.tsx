import MedicationDetail from "@/modules/medications/pages/Detail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MedicationDetail id={id} />;
}
