import PatientDashboard from "@/modules/patient/pages/Dashboard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PatientDashboard id={id} />;
}
