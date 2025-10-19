import { Toast } from "primereact/toast";

let toastRef: Toast | null = null;

/**
 * Toast の参照をグローバルに登録
 */
export const setToast = (ref: Toast) => {
  toastRef = ref;
};

/**
 * Toast をどこからでも表示できる関数
 */
export const showToast = (
  severity: "success" | "info" | "warn" | "error",
  summary: string,
  detail?: string
) => {
  if (toastRef) {
    toastRef.show({ severity, summary, detail, life: 4000 });
  } else {
    console.warn("Toast not initialized yet.");
  }
};
