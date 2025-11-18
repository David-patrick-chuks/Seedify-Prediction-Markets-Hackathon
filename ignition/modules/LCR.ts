import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LCR = buildModule("LCRModule", (m) => {
  const LCR = m.contract("LCR", []);
  return { lucroPrediction: LCR };
});

export default LCR;
