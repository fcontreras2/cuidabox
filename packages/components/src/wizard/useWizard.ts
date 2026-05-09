import { useState } from "react";

export interface WizardStep {
  id: string;
  onSubmit: () => Promise<boolean>;
}

export function useWizard(steps: WizardStep[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;
  const totalSteps = steps.length;

  const next = async () => {
    const valid = await steps[currentIndex].onSubmit();
    if (valid) setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const back = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return { currentIndex, isFirst, isLast, totalSteps, next, back };
}
