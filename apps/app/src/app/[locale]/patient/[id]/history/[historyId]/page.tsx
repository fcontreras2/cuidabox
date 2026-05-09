import HistoryDetail from "@/modules/patient/pages/HistoryDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ historyId: string }>;
}) {
  const { historyId } = await params;
  return <HistoryDetail id={historyId} />;
}
