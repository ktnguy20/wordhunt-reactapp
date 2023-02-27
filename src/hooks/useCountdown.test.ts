import {act, renderHook} from '@testing-library/react';
import exp from 'constants';
import useCountdown from './useCountdown';

jest.useFakeTimers();

// result.current is [timer, setTime, isPlaying, setIsPlaying]
describe('useCountdown', () => {
  it('initlization should work', () => {
    const {result} = renderHook(() => useCountdown(10, true, () => {}));
    expect(result.current[0]).toBe(10);
  });


  it('countdown works', () => {
    const {result} = renderHook(() => useCountdown(10, true, () => {}));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const [timer, setTime, isPlaying, setIsPlaying] = result.current;
    expect(timer).toBe(9);
  });

  it('pause works', () => {
    const {result} = renderHook(() => useCountdown(10, true, () => {}));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const [timer, setTime, isPlaying, setIsPlaying] = result.current;

    expect(timer).toBe(9);

    act(() => {
      setIsPlaying(false);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(9);
    expect(result.current[2]).toBe(false);
  });
});

