import { formatUnits } from "viem";

const formatLCR = (lcr: bigint, decimals = 0): string => (+formatUnits(lcr, 9)).toFixed(decimals);

export default formatLCR;
