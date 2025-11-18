import dotenv from "dotenv";
import { BaseError, ContractFunctionConfig, createWalletClient, formatEther, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lucroPredictionConfig } from "../hooks/generated";
import { mapRound } from "./util";
import * as chains from "viem/chains";

const CONFIRMATIONS = 9;

dotenv.config({
    path: ".env",
});

const TIMEOUT = 1000;

const networkFlagIndex = process.argv.indexOf("network");
const networkFlag = process.argv[networkFlagIndex + 1];

console.log(process.argv)

if (!networkFlag) {
    throw new Error("Network flag is missing");
}

const chain = chains[networkFlag as keyof typeof chains];

if (!chain) {
    throw new Error(`Chain ${networkFlag} is not supported :(`);
}

const envKey = `KEY_${networkFlag.toUpperCase()}`;

const PRIVATE_KEY = process.env[envKey] as `0x${string}`;

if (!PRIVATE_KEY) {
    throw new Error(`Please set ${envKey} in .env file`);
}

if (!PRIVATE_KEY.startsWith("0x")) {
    throw new Error("Private key should start with 0x");
}

const account = privateKeyToAccount(PRIVATE_KEY);

let spentGas = BigInt(0);

const scheduler = async () => {
    const chainId = chain.id as keyof typeof lucroPredictionConfig.address;
    if (!lucroPredictionConfig.address[chainId]) {
        throw new Error(`Address for chain ${chainId} is missing`);
    }

    const address = lucroPredictionConfig.address[chainId];
    const abi = lucroPredictionConfig.abi;
    const contract = { address, abi, account };

    const walletClient = createWalletClient({
        chain,
        transport: http(),
    });

    const publicClient = publicActions(walletClient);

    const writeContract = async (
        functionName: ContractFunctionConfig<typeof contract.abi, string, "nonpayable" | "payable">["functionName"]
    ) => {
        const { request } = await publicClient.simulateContract({ ...contract, functionName });
        // @ts-ignore
        const hash = await walletClient.writeContract(request);

        const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: CONFIRMATIONS });
        spentGas += BigInt(receipt.gasUsed);

        console.info("gasUsed:", formatEther(receipt.gasUsed));

        console.info(functionName, hash.toString());
    };

    const process = async () => {
        try {
            const [currentEpoch, paused, genesisStartOnce, genesisLockOnce, bufferSeconds] = await publicClient.multicall({
                contracts: [
                    { ...contract, functionName: "currentEpoch" },
                    { ...contract, functionName: "paused" },
                    { ...contract, functionName: "genesisStartOnce" },
                    { ...contract, functionName: "genesisLockOnce" },
                    { ...contract, functionName: "bufferSeconds" },
                ],
                allowFailure: false,
            });

            const currentRound = await publicClient.readContract({
                ...contract,
                functionName: "rounds",
                args: [currentEpoch],
            });

            console.table({
                currentEpoch,
                paused,
                genesisStartOnce,
                genesisLockOnce,
                bufferSeconds,
                spentGas: formatEther(spentGas),
            });

            const mappedRound = mapRound(currentRound);

            const timestamp = Math.floor(Date.now() / 1000);

            if (paused) {
                // TODO: we should wait for input here
                console.warn("Contract is paused for some reason");
                console.info("Unpausing the contract");
                await writeContract("unpause");
                setTimeout(process, TIMEOUT);
                return;
            }

            if (!genesisStartOnce) {
                console.info("Starting the round");
                await writeContract("genesisStartRound");
                setTimeout(process, TIMEOUT);
                return;
            }

            if (timestamp < mappedRound.lockTimestamp) {
                console.info("Current round is still active");
                console.info(`Round will be closed after ${mappedRound.lockTimestamp - BigInt(timestamp)} seconds`);
                setTimeout(process, TIMEOUT);
                return;
            }

            if (timestamp > mappedRound.lockTimestamp + bufferSeconds) {
                console.warn("Missed the window to execute the round, pausing the contract");
                await writeContract("pause");
                setTimeout(process, TIMEOUT);
                return;
            }

            if (!genesisLockOnce) {
                console.info("The contract was paused and unpaused before or this is the first round");
                console.info("Locking the round");
                await writeContract("genesisLockRound");
                setTimeout(process, TIMEOUT);
                return;
            }

            // Everything looks good! Let's execute the round
            console.info("Executing the round");
            await writeContract("executeRound");
        } catch (error) {
            if (error instanceof BaseError) console.error("\x1b[31mERROR:\x1b[0m", error.shortMessage);
            else console.error("\x1b[31mERROR:\x1b[0m", error);
        }
        setTimeout(process, TIMEOUT);
    };

    process();
};

scheduler();
