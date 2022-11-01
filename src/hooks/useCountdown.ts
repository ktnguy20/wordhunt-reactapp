import {useState, useEffect, useRef} from 'react';

const useCountdown = (
    initialTimer: number,
    initialPlaying: boolean,
    onTimeout: () => void,
):
[
  timer: number,
  setTime: (time:number) => void,
  isPlaying: boolean,
  setIsPlaying: (bool:boolean) => void
] => {
  const milisecond = useRef<number>(initialTimer * 1000);
  const previous = useRef<number>(milisecond.current);
  const [timer, setTimer] = useState<number>(initialTimer);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialPlaying);

  const setTime = (time: number) => {
    milisecond.current = time * 1000;
    previous.current = milisecond.current;
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (milisecond.current <= 0) {
      return;
    }
    const effectInitialMs = milisecond.current;
    let effectInitialTimeStamp: number;
    let handle: number;
    const step = (timestampMs: number) => {
      if (effectInitialTimeStamp === undefined) {
        effectInitialTimeStamp = timestampMs;
      }
      const elapsed = timestampMs - effectInitialTimeStamp;
      milisecond.current = effectInitialMs - elapsed;
      if (milisecond.current <= 0) {
        setTimer(0);
        cancelAnimationFrame(handle);
        setIsPlaying(false);
        onTimeout();
      } else {
        const seconds = Math.floor(milisecond.current / 1000);
        const isUpdate = seconds !== Math.floor(previous.current / 1000);
        previous.current = milisecond.current;

        if (isUpdate) {
          setTimer(seconds);
        }
        if (isPlaying) {
          handle = window.requestAnimationFrame(step);
        }
      }
    };

    handle = window.requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(handle);
    };
  }, [isPlaying, initialTimer]);
  return [timer, setTime, isPlaying, setIsPlaying];
};

export default useCountdown;
