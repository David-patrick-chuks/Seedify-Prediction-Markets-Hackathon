import { formatUnits } from "viem";

export const formatBigIntToFixed = (number: bigint, displayDecimals = 18, decimals = 18) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};
