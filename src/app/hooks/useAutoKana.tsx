import { useRef, useEffect, useState, ChangeEvent } from "react";

export const useAutoKana = (nameId: string, kanaId: string) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const nameKanaRef = useRef<HTMLInputElement>(null);
  const [autokana, setAutoKana] = useState<any>(null); // eslint-disable-line

  useEffect(() => {
    if (typeof window !== "undefined") {
      // クライアントサイドでのみvanilla-autokanaをインポート
      import("vanilla-autokana").then((AutoKana) => {
        const ak = AutoKana.bind(`${nameId}`, `${kanaId}`, {});
        setAutoKana(ak);
      });
    }
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = nameRef.current;
    const kana = nameKanaRef.current;

    if (!name) return;
    name.value = e.target.value;

    if (!kana || !autokana) return;
    kana.value = autokana.getFurigana();
  };

  return {
    nameRef,
    nameKanaRef,
    handleNameChange,
  };
};
