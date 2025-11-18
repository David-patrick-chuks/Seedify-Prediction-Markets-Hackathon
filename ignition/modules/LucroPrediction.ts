import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LucroPredictionModule = buildModule("LucroPredictionModule", (m) => {
  const token = m.getParameter("token", "0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9");
  const oracleAddress = m.getParameter("oracleAddress", "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf");
  const adminAddress = m.getParameter("adminAddress", "0x86C2681AbA1d4C42C66Ae902953C7939bCDdE138");
  const operatorAddress = m.getParameter("operatorAddress", "0x2261B3F05073e15470D860fb0110fF01C352E590");

  const intervalSeconds = m.getParameter("intervalSeconds", 300);
  const bufferSeconds = m.getParameter("bufferSeconds", 80);
  const minBetAmount = m.getParameter("minBetAmount", 10000000000000);
  const oracleUpdateAllowance = m.getParameter("oracleUpdateAllowance", 300);
  const treasuryFee = m.getParameter("treasuryFee", 500);

  const lucroPrediction = m.contract("LucroPrediction", [
    token,
    oracleAddress,
    adminAddress,
    operatorAddress,
    intervalSeconds,
    bufferSeconds,
    minBetAmount,
    oracleUpdateAllowance,
    treasuryFee,
  ]);

  return { lucroPrediction };
});

export default LucroPredictionModule;
