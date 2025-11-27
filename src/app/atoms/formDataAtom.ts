import { atom } from "jotai";
import { FormValues } from "../components/organisms/navigationMegaMenu/register/stepZero/StepZero";

export const formDataRegisterAtom = atom<FormValues>();
formDataRegisterAtom.debugLabel = "formDataRegisterAtom";
