import { useEffect } from "react";

export function useEffectOnce(effect: () => void) {
  useEffect(() => {
    effect();
  }, []);
}
