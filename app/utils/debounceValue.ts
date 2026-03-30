export function debounceValue<T>(
  callback: (value: T) => void,
  delay: number
): (value: T) => void {
  if (delay < 0) {
    throw new Error('delay nie może być ujemny');
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (value: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(value);
    }, delay);
  };
}