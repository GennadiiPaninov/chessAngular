import { WritableSignal, untracked, effect } from '@angular/core';


export function debounceSignal<T>(
  source: WritableSignal<T>,
  delay: number,
  callback: (value: T) => void
): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const effectRef = effect(() => {
    const value = source();

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(untracked(source));
    }, delay);
  });

  return () => {
    effectRef.destroy(); // ✅ так правильно
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  };
}
