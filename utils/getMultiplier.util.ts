import { BIG_ZERO } from "./constants";

import BigNumber from "bignumber.js";

export const getMultiplier = (total: bigint, amount: bigint) => {
  if (!total) return BIG_ZERO;

  if (total === BigInt(0) || amount === BigInt(0)) return BIG_ZERO;

  const rewardAmountFixed = new BigNumber(total.toString());
  const multiplierAmountFixed = new BigNumber(amount.toString());

  return rewardAmountFixed.div(multiplierAmountFixed);
};
