import {useState, useEffect, useRef} from 'react';

const useCountdown = (
    initialTimer: number,
    initialPlaying: boolean,
    onTimeout: () => void,
):
[timer: number, isPlaying: boolean, setIsPlaying: (bool:boolean) => void] => {
  const milisecond = useRef<number>(initialTimer * 1000);
  const previous = useRef<number>(milisecond.current);
  const [timer, setTimer] = useState<number>(initialTimer);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialPlaying);

  useEffect(() => {
    if (!isPlaying) return;
    if (milisecond.current <= 0) {
      setIsPlaying(false);
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
        console.log('mili <= 0');
        setTimer(0);
        console.log('cancelAnimationFrame(zero)', handle, milisecond.current);
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
      console.log('cancelAnimationFrame(pause)', handle, milisecond.current);
      cancelAnimationFrame(handle);
    };
  }, [isPlaying, initialTimer]);
  return [timer, isPlaying, setIsPlaying];
};

export default useCountdown;
