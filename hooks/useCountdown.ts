import { useEffect, useMemo, useState } from "react";

import { useRef } from "react";

export const isNumber = (value: unknown): value is number => typeof value === "number";

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export type TDate = Date | number | undefined;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (target?: TDate) => {
  if (!target) {
    return 0;
  }
  const left = target instanceof Date ? target.getTime() - Date.now() : target - Date.now();
  return left < 0 ? 0 : left;
};

const useCountdown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  const memoLeftTime = useMemo<TDate>(() => {
    return isNumber(leftTime) && leftTime > 0 ? Date.now() + leftTime : undefined;
  }, [leftTime]);

  const target = "leftTime" in options ? memoLeftTime : targetDate;

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    setTimeLeft(calcLeft(target));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  return timeLeft;
};

export default useCountdown;
