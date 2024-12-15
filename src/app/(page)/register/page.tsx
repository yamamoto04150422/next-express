"use client";

import { useState } from "react";
import StepTwo from "@/app/components/organisms/navigationMegaMenu/register/stepTwo/StepTwo";
import StepOne from "@/app/components/organisms/navigationMegaMenu/register/stepOne/StepOne";
import StepZero from "@/app/components/organisms/navigationMegaMenu/register/stepZero/StepZero";
import { Steps } from "primereact/steps";
import { items } from "@/app/utils/data/StepsItems";

export default function RegisterPage() {
  const [step, setStep] = useState(0);

  return (
    <>
      <Steps model={items} activeIndex={step} style={{ padding: "30px 0" }} />
      {step === 0 && <StepZero setStep={setStep} />}
      {step === 1 && <StepOne setStep={setStep} />}
      {step === 2 && <StepTwo />}
    </>
  );
}
