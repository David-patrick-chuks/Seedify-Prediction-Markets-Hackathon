import parseMs from "./parseMs";

const padTime = (value: number) => value.toString().padStart(2, "0");

const formatCountdown = (milliseconds: number) => {
  const { minutes, seconds } = parseMs(milliseconds);

  return { minutes: padTime(minutes), seconds: padTime(seconds) };
};

export default formatCountdown;
