import { useEffect, useRef, useCallback } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  const intervalId = useRef(null);
  const reset = useCallback(() => {
    function tick() {
      savedCallback.current();
    }
    if (intervalId.current) clear();

    if (delay !== null) {
      intervalId.current = setInterval(tick, delay);
    }
  }, [clear, delay]);

  const clear = useCallback(() => {
    clearInterval(intervalId.current);
  }, []);
  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // const set = useCallback(() => {
  //   setDelay(delay);
  // }, [delay]);

  // Set up the interval.
  useEffect(() => {
    reset();

    return clear;
  }, [delay, reset, clear]);

  return [reset, !!delay];
}

// let id = setTimeout(function recurrent() {
//     tick();
//     id = setTimeout(recurrent, delay);
//   }, delay);
//   return () => clearInterval(id);
