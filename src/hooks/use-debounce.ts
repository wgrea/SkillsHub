// src/hooks/use-debounce.ts 
// Not in 1.3v - Bolt

import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Clean up timeout on unmount
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    cleanup();
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay, cleanup]);

  // Type assertion to maintain the same function type
  return debouncedCallback as T;
}