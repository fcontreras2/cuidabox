"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, Sparkles, Camera, Pencil, Check } from "lucide-react";
import { Button, Textarea } from "fcontreras2-ui";
import { PhoneFrame } from "@/shared/components";
import { quickRegisterSchema, type QuickRegisterValues } from "@/shared/lib/validation";
import { useMain } from "./useMain";
import { MicCanvas } from "./components/MicCanvas";
import { ExampleChip } from "./components/ExampleChip";

export default function RegisterMain() {
  const t = useTranslations("modules-register-pages-Main");
  const router = useRouter();
  const {
    text,
    setText,
    recording,
    toggleRecording,
    parsed,
    process,
    examples,
    useExample,
  } = useMain();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<QuickRegisterValues>({
    resolver: yupResolver(quickRegisterSchema),
    values: { text },
  });

  const onSubmit = handleSubmit(() => {
    process();
  });

  return (
    <PhoneFrame>
      <header className="px-6 pt-12 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={t("title")}
          className="size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700 hover:border-coral-200 transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-plum-100 text-plum-500 text-[12px] font-semibold">
          <Sparkles className="size-3.5" />
          Asistente IA
        </span>
        <span className="size-10" aria-hidden />
      </header>

      <section className="px-6 pt-2 pb-6">
        <p className="font-display-italic text-[18px] text-coral-600">{t("title")}</p>
        <h1 className="mt-1 font-display text-[36px] leading-[1.08] tracking-tight text-primary-700">
          {t("titleAccent")}
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600 max-w-[300px]">
          {t("subtitle")}
        </p>
      </section>

      <main className="flex-1 overflow-y-auto px-6 pb-6">
        <MicCanvas recording={recording} onToggle={toggleRecording} />

        <form onSubmit={onSubmit} className="mt-4">
          <div className="rounded-[20px] border border-line bg-paper p-3 focus-within:border-coral-300 focus-within:ring-4 focus-within:ring-coral-100 transition-all">
            <Textarea
              {...register("text")}
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder={t("typeInstead")}
              rows={2}
              error={errors.text?.message}
              classNames={{
                wrapper: "!gap-1",
                textarea:
                  "!border-0 !p-0 !shadow-none !text-[15px] focus:!ring-0 focus:!ring-offset-0 focus:!border-0 placeholder:!text-ink-400 !bg-transparent !min-h-0 resize-none",
                errorText: "!text-coral-600 mt-1",
              }}
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-line-soft">
              <button
                type="button"
                aria-label="Adjuntar foto"
                className="size-9 rounded-full bg-cream-2 grid place-items-center text-primary-700 hover:bg-line"
              >
                <Camera className="size-4" />
              </button>
              <Button
                type="submit"
                size="md"
                leftIcon={<Sparkles className="size-4" />}
                className="!bg-primary-700 !text-cream !rounded-full !h-10 !px-5 hover:!bg-primary-900"
              >
                {t("process")}
              </Button>
            </div>
          </div>
        </form>

        {parsed && (
          <div className="mt-4 p-4 rounded-[20px] bg-cream-2/60 border border-dashed border-coral-200">
            <p className="font-display-italic text-[14px] text-coral-600 flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              Esto entendí
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[13.5px]">
              <dt className="text-ink-400">Tipo</dt>
              <dd className="text-primary-700 font-medium">{parsed.type}</dd>
              {parsed.drug && (
                <>
                  <dt className="text-ink-400">Fármaco</dt>
                  <dd className="text-primary-700 font-medium">{parsed.drug}</dd>
                </>
              )}
              {parsed.fever && (
                <>
                  <dt className="text-ink-400">Fiebre</dt>
                  <dd className="text-primary-700 font-medium">{parsed.fever}</dd>
                </>
              )}
              {parsed.time && (
                <>
                  <dt className="text-ink-400">Hora</dt>
                  <dd className="text-primary-700 font-medium">{parsed.time}</dd>
                </>
              )}
            </dl>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Pencil className="size-4" />}
                className="!border-line !text-primary-700 !rounded-full"
              >
                Editar
              </Button>
              <Button
                size="md"
                fullWidth
                leftIcon={<Check className="size-4" />}
                className="!bg-coral-500 !text-paper !rounded-full hover:!bg-coral-600"
              >
                {t("save")}
              </Button>
            </div>
          </div>
        )}

        <section className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-400 mb-3">
            {t("examples")}
          </p>
          <div className="flex flex-col gap-2.5">
            {examples.map((ex) => (
              <ExampleChip key={ex.id} example={ex} onClick={useExample} />
            ))}
          </div>
        </section>
      </main>
    </PhoneFrame>
  );
}
