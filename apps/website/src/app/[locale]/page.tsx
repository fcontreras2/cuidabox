import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex flex-col items-center justify-center flex-1 p-8">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-lg text-gray-600">{t("description")}</p>
    </main>
  );
}
