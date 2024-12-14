"use client";

import { useState } from "react";
import StepTwo from "@/app/components/organisms/navigationMegaMenu/register/stepTwo/StepTwo";
import StepOne from "@/app/components/organisms/navigationMegaMenu/register/stepOne/StepOne";
import StepZero from "@/app/components/organisms/navigationMegaMenu/register/stepZero/StepZero";

export default function RegisterPage() {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <StepZero setStep={setStep} />}
      {step === 1 && <StepOne setStep={setStep} />}
      {step === 2 && <StepTwo />}
    </>
  );
}
