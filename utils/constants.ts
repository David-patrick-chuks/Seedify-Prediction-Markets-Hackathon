import BigNumber from "bignumber.js";
import { bscTestnet, bsc } from "wagmi/chains";

export const BIG_ZERO = new BigNumber(0);

export const MAX_UINT256 = 57896044618658097711785492504343953926634992332820282019728792003956564819967;

export const POLLING_INTERVAL = 4000;

export const ORACLE_ADDRESS = Object.freeze({
  [bscTestnet.id]: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526",
  [bsc.id]: "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
});
