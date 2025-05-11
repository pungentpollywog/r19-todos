import { useCallback, useRef } from "react";

export function useThrottle(callback, delay) {
  const previousCall = useRef(0);

  const throttledCall = useCallback((...args) => {
    const now = Date.now();
    if (now - previousCall.current >= delay) {
      previousCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);

  return throttledCall;
}