export type Round = {
    epoch: bigint;
    startTimestamp: bigint;
    lockTimestamp: bigint;
    closeTimestamp: bigint;
    lockPrice: bigint;
    closePrice: bigint;
    lockOracleId: bigint;
    closeOracleId: bigint;
    totalAmount: bigint;
    bullAmount: bigint;
    bearAmount: bigint;
    rewardBaseCalAmount: bigint;
    rewardAmount: bigint;
    oracleCalled: boolean;
};
