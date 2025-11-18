import { parseUnits } from "viem";

const parseLCR = (lcr: string) => parseUnits(lcr, 9)

export default parseLCR