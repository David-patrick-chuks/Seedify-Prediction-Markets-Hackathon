export const getHasRoundFailed = (
  oracleCalled: boolean,
  closeTimestamp: bigint,
  buffer: bigint,
  closePrice: bigint,
) => {
  return false

  if (closePrice === 0n) return true;

  if (!oracleCalled && !closeTimestamp) {
    const closeTimestampMs = (Number(closeTimestamp) + Number(buffer)) * 1000;
    if (Number.isFinite(closeTimestampMs)) {
      return Date.now() > closeTimestampMs;
    }
  }

  return false;
};

export default getHasRoundFailed;
