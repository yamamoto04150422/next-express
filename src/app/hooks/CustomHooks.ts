import { useEffect } from "react";

export function useEffectOnce(effect: () => void) {
  useEffect(() => {
    effect();
    // eslint-disable-next-line
  }, []);
}
