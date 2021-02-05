/**
 * Returns a function that will not be triggered as long as it is constantly 
 * triggered within the specified amount of time in milliseconds (waitFor)
 * SOURCE:
 * - https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940#gistcomment-3306762
 * @param func The function that will be triggered
 * @param waitFor The amount of time, in milliseconds, to wait
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};