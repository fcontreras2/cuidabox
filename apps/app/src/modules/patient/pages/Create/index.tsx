"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button, Icon, Modal } from "fcontreras2-ui";
import { useWizard } from "@cuidabox/components";
import { PhoneFrame } from "@/shared/components";
import { useStep1 } from "./steps/useStep1";
import { useStep2 } from "./steps/useStep2";
import { useStep3 } from "./steps/useStep3";
import { Step1Basic } from "./steps/Step1Basic";
import { Step2Medical } from "./steps/Step2Medical";
import { Step3Insurance } from "./steps/Step3Insurance";
import { useCreate } from "./useCreate";

export default function PatientCreate() {
  const t = useTranslations("modules-patient-pages-Create");
  const router = useRouter();

  const step1 = useStep1();
  const step2 = useStep2();
  const step3 = useStep3();
  const { submit, isPending, serverError } = useCreate();

  const wizard = useWizard([
    { id: "basic", onSubmit: step1.onSubmit },
    { id: "medical", onSubmit: step2.onSubmit },
    { id: "insurance", onSubmit: step3.onSubmit },
  ]);

  const { currentIndex, isFirst, isLast, totalSteps, next, back } = wizard;
  const stepTitles = [t("steps.1"), t("steps.2"), t("steps.3")];

  const directionRef = useRef<"forward" | "backward">("forward");
  const [confirmExit, setConfirmExit] = useState(false);

  const handleNext = async () => {
    if (isLast) {
      const valid = await step3.onSubmit();
      if (!valid) return;
      submit({
        step1: step1.methods.getValues(),
        step2: step2.methods.getValues(),
        step3: step3.methods.getValues(),
      });
    } else {
      directionRef.current = "forward";
      next();
    }
  };

  const handleBack = () => {
    if (isFirst) {
      const vals = step1.methods.getValues();
      const hasData = vals.name || vals.birthdate || vals.relationship;
      if (hasData) {
        setConfirmExit(true);
      } else {
        router.push("/");
      }
    } else {
      directionRef.current = "backward";
      back();
    }
  };

  const slideClass =
    directionRef.current === "forward"
      ? "animate-slide-forward"
      : "animate-slide-backward";

  return (
    <PhoneFrame>
      {/* Header */}
      <header className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-5">
          <button
            type="button"
            onClick={handleBack}
            className="size-9 rounded-full bg-neutral-100 dark:bg-neutral-800 grid place-items-center text-primary-700 dark:text-primary-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <Icon name="chevron-left" size="md" />
          </button>
          <div className="flex-1">
            <p className="text-[12px] text-ink-400 dark:text-ink-500 uppercase tracking-[0.12em] font-semibold">
              {t("title")} · {currentIndex + 1}/{totalSteps}
            </p>
            <h1 className="font-display text-[22px] leading-tight text-primary-700 dark:text-primary-300">
              {stepTitles[currentIndex]}
            </h1>
          </div>
        </div>

        {/* Progress bars con delay escalonado */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                i <= currentIndex
                  ? "bg-primary-600"
                  : "bg-neutral-200 dark:bg-neutral-700"
              }`}
            />
          ))}
        </div>
      </header>

      {/* Step content con slide */}
      <main className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
        <div key={currentIndex} className={slideClass}>
          {currentIndex === 0 && <Step1Basic hook={step1} />}
          {currentIndex === 1 && <Step2Medical hook={step2} />}
          {currentIndex === 2 && <Step3Insurance hook={step3} />}
        </div>

        {serverError && (
          <p className="text-[13px] text-coral-600 text-center mt-4">
            {t(`errors.${serverError}`)}
          </p>
        )}
      </main>

      {/* Footer */}
      <div className="px-6 pb-10 pt-2">
        <Button
          type="button"
          size="lg"
          fullWidth
          loading={isPending}
          onClick={handleNext}
          rightIcon={<Icon name={isLast ? "heart" : "arrow-right"} size="sm" />}
          className="bg-primary-700! text-cream! rounded-2xl! hover:bg-primary-900! h-14!"
        >
          {isLast ? t("submit") : t("next")}
        </Button>
      </div>

      {/* Confirmación al salir con datos */}
      <Modal
        open={confirmExit}
        onClose={() => setConfirmExit(false)}
        title={t("exitConfirm.title")}
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConfirmExit(false)}
            >
              {t("exitConfirm.cancel")}
            </Button>
            <Button
              size="sm"
              className="bg-coral-600! text-white! hover:bg-coral-500!"
              onClick={() => router.push("/")}
            >
              {t("exitConfirm.confirm")}
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-ink-600 dark:text-neutral-400">
          {t("exitConfirm.body")}
        </p>
      </Modal>
    </PhoneFrame>
  );
}
