import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  useNetwork,
  useChainId,
  Address,
} from 'wagmi'
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AggregatorV3Interface
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aggregatorV3InterfaceABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'description',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_roundId', internalType: 'uint80', type: 'uint80' }],
    name: 'getRoundData',
    outputs: [
      { name: 'roundId', internalType: 'uint80', type: 'uint80' },
      { name: 'answer', internalType: 'int256', type: 'int256' },
      { name: 'startedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'answeredInRound', internalType: 'uint80', type: 'uint80' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { name: 'roundId', internalType: 'uint80', type: 'uint80' },
      { name: 'answer', internalType: 'int256', type: 'int256' },
      { name: 'startedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'answeredInRound', internalType: 'uint80', type: 'uint80' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LCR
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export const lcrABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export const lcrAddress = {
  56: '0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9',
  97: '0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export const lcrConfig = { address: lcrAddress, abi: lcrABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LucroPrediction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export const lucroPredictionABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_token', internalType: 'contract IERC20', type: 'address' },
      { name: '_oracleAddress', internalType: 'address', type: 'address' },
      { name: '_adminAddress', internalType: 'address', type: 'address' },
      { name: '_operatorAddress', internalType: 'address', type: 'address' },
      { name: '_intervalSeconds', internalType: 'uint256', type: 'uint256' },
      { name: '_bufferSeconds', internalType: 'uint256', type: 'uint256' },
      { name: '_minBetAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_oracleUpdateAllowance', internalType: 'uint256', type: 'uint256' },
      { name: '_treasuryFee', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BetBear',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BetBull',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Claim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'roundId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'price', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'EndRound',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'roundId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'price', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'LockRound',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'admin', internalType: 'address', type: 'address', indexed: false }],
    name: 'NewAdminAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'bufferSeconds', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'intervalSeconds', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'NewBufferAndIntervalSeconds',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'minBetAmount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'NewMinBetAmount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'operator', internalType: 'address', type: 'address', indexed: false }],
    name: 'NewOperatorAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'oracle', internalType: 'address', type: 'address', indexed: false }],
    name: 'NewOracle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'oracleUpdateAllowance', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'NewOracleUpdateAllowance',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'treasuryFee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'NewTreasuryFee',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true }],
    name: 'Pause',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'rewardBaseCalAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'treasuryAmount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'RewardsCalculated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true }],
    name: 'StartRound',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'token', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TokenRecovery',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'TreasuryClaim',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256', indexed: true }],
    name: 'Unpause',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TREASURY_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'adminAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'betBear',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'betBull',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bufferSeconds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'epochs', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'claim',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'claimTreasury', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'claimable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'executeRound', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'genesisLockOnce',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'genesisLockRound', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'genesisStartOnce',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'genesisStartRound', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'cursor', internalType: 'uint256', type: 'uint256' },
      { name: 'size', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUserRounds',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: '',
        internalType: 'struct LucroPrediction.BetInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'position', internalType: 'enum LucroPrediction.Position', type: 'uint8' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'claimed', internalType: 'bool', type: 'bool' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserRoundsLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'intervalSeconds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'ledger',
    outputs: [
      { name: 'position', internalType: 'enum LucroPrediction.Position', type: 'uint8' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'claimed', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'minBetAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'operatorAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'oracle',
    outputs: [{ name: '', internalType: 'contract AggregatorV3Interface', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'oracleLatestRoundId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'oracleUpdateAllowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'pause', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recoverToken',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'refundable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'rounds',
    outputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'startTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'lockTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'closeTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'lockPrice', internalType: 'int256', type: 'int256' },
      { name: 'closePrice', internalType: 'int256', type: 'int256' },
      { name: 'lockOracleId', internalType: 'uint256', type: 'uint256' },
      { name: 'closeOracleId', internalType: 'uint256', type: 'uint256' },
      { name: 'totalAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'bullAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'bearAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardBaseCalAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'oracleCalled', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_adminAddress', internalType: 'address', type: 'address' }],
    name: 'setAdmin',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_bufferSeconds', internalType: 'uint256', type: 'uint256' },
      { name: '_intervalSeconds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setBufferAndIntervalSeconds',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_minBetAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinBetAmount',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_operatorAddress', internalType: 'address', type: 'address' }],
    name: 'setOperator',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_oracle', internalType: 'address', type: 'address' }],
    name: 'setOracle',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_oracleUpdateAllowance', internalType: 'uint256', type: 'uint256' }],
    name: 'setOracleUpdateAllowance',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_treasuryFee', internalType: 'uint256', type: 'uint256' }],
    name: 'setTreasuryFee',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasuryAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'treasuryFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'unpause', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userRounds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export const lucroPredictionAddress = {
  56: '0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1',
  97: '0x22A43cFfc56b03804927d177Bbb586C1735341Ab',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export const lucroPredictionConfig = { address: lucroPredictionAddress, abi: lucroPredictionABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pausable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pausableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
    name: 'Unpaused',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aggregatorV3InterfaceABI}__.
 */
export function useAggregatorV3InterfaceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof aggregatorV3InterfaceABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: aggregatorV3InterfaceABI, ...config } as UseContractReadConfig<
    typeof aggregatorV3InterfaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aggregatorV3InterfaceABI}__ and `functionName` set to `"decimals"`.
 */
export function useAggregatorV3InterfaceDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof aggregatorV3InterfaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aggregatorV3InterfaceABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aggregatorV3InterfaceABI}__ and `functionName` set to `"description"`.
 */
export function useAggregatorV3InterfaceDescription<
  TFunctionName extends 'description',
  TSelectData = ReadContractResult<typeof aggregatorV3InterfaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aggregatorV3InterfaceABI,
    functionName: 'description',
    ...config,
  } as UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aggregatorV3InterfaceABI}__ and `functionName` set to `"getRoundData"`.
 */
export function useAggregatorV3InterfaceGetRoundData<
  TFunctionName extends 'getRoundData',
  TSelectData = ReadContractResult<typeof aggregatorV3InterfaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aggregatorV3InterfaceABI,
    functionName: 'getRoundData',
    ...config,
  } as UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aggregatorV3InterfaceABI}__ and `functionName` set to `"latestRoundData"`.
 */
export function useAggregatorV3InterfaceLatestRoundData<
  TFunctionName extends 'latestRoundData',
  TSelectData = ReadContractResult<typeof aggregatorV3InterfaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: aggregatorV3InterfaceABI,
    functionName: 'latestRoundData',
    ...config,
  } as UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link aggregatorV3InterfaceABI}__ and `functionName` set to `"version"`.
 */
export function useAggregatorV3InterfaceVersion<
  TFunctionName extends 'version',
  TSelectData = ReadContractResult<typeof aggregatorV3InterfaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof aggregatorV3InterfaceABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: aggregatorV3InterfaceABI, functionName: 'version', ...config } as UseContractReadConfig<
    typeof aggregatorV3InterfaceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: 'allowance', ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: 'balanceOf', ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: 'decimals', ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: 'name', ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: 'symbol', ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: 'totalSupply', ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({ abi: erc20ABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useErc20DecreaseAllowance<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, 'decreaseAllowance'>['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof erc20ABI, 'decreaseAllowance', TMode> & {
        abi?: never
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'decreaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useErc20IncreaseAllowance<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, 'increaseAllowance'>['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof erc20ABI, 'increaseAllowance', TMode> & {
        abi?: never
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'increaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, 'transfer'>['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>, 'abi'> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc20ABI, ...config } as UsePrepareContractWriteConfig<
    typeof erc20ABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc20ABI, functionName: 'approve', ...config } as UsePrepareContractWriteConfig<
    typeof erc20ABI,
    'approve'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareErc20DecreaseAllowance(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareErc20IncreaseAllowance(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof erc20ABI, TEventName>, 'abi'> = {} as any,
) {
  return useContractEvent({ abi: erc20ABI, ...config } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof erc20ABI, 'Approval'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: erc20ABI, eventName: 'Approval', ...config } as UseContractEventConfig<
    typeof erc20ABI,
    'Approval'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<UseContractEventConfig<typeof erc20ABI, 'Transfer'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: erc20ABI, eventName: 'Transfer', ...config } as UseContractEventConfig<
    typeof erc20ABI,
    'Transfer'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: ierc20ABI, ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: 'allowance', ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: 'balanceOf', ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, 'abi' | 'functionName'> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: 'totalSupply', ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, TFunctionName, TMode>({ abi: ierc20ABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'approve', TMode>({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, 'transfer'>['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transfer', TMode>({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transferFrom', TMode>({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function usePrepareIerc20Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>, 'abi'> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc20ABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc20ABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc20ABI, TEventName>, 'abi'> = {} as any,
) {
  return useContractEvent({ abi: ierc20ABI, ...config } as UseContractEventConfig<typeof ierc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc20ABI, 'Approval'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: ierc20ABI, eventName: 'Approval', ...config } as UseContractEventConfig<
    typeof ierc20ABI,
    'Approval'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20TransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc20ABI, 'Transfer'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: ierc20ABI, eventName: 'Transfer', ...config } as UseContractEventConfig<
    typeof ierc20ABI,
    'Transfer'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: ierc20MetadataABI, ...config } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20MetadataAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MetadataABI, functionName: 'allowance', ...config } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20MetadataBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MetadataABI, functionName: 'balanceOf', ...config } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"decimals"`.
 */
export function useIerc20MetadataDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MetadataABI, functionName: 'decimals', ...config } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"name"`.
 */
export function useIerc20MetadataName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MetadataABI, functionName: 'name', ...config } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc20MetadataSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MetadataABI, functionName: 'symbol', ...config } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20MetadataTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MetadataABI, functionName: 'totalSupply', ...config } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MetadataABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20MetadataABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, TFunctionName, TMode>({ abi: ierc20MetadataABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20MetadataApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MetadataABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'approve', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20MetadataTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MetadataABI, 'transfer'>['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transfer', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20MetadataTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MetadataABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transferFrom', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function usePrepareIerc20MetadataWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20MetadataABI, TFunctionName>, 'abi'> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc20MetadataABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc20MetadataABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20MetadataApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20MetadataTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20MetadataTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc20MetadataABI, TEventName>, 'abi'> = {} as any,
) {
  return useContractEvent({ abi: ierc20MetadataABI, ...config } as UseContractEventConfig<
    typeof ierc20MetadataABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20MetadataApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc20MetadataABI, 'Approval'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: ierc20MetadataABI, eventName: 'Approval', ...config } as UseContractEventConfig<
    typeof ierc20MetadataABI,
    'Approval'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20MetadataTransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc20MetadataABI, 'Transfer'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: ierc20MetadataABI, eventName: 'Transfer', ...config } as UseContractEventConfig<
    typeof ierc20MetadataABI,
    'Transfer'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: ierc20PermitABI, ...config } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useIerc20PermitDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20PermitABI, functionName: 'DOMAIN_SEPARATOR', ...config } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"nonces"`.
 */
export function useIerc20PermitNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20PermitABI, functionName: 'nonces', ...config } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20PermitABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20PermitABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, TFunctionName, TMode>({ abi: ierc20PermitABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function useIerc20PermitPermit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20PermitABI, 'permit'>['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof ierc20PermitABI, 'permit', TMode> & {
        abi?: never
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, 'permit', TMode>({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function usePrepareIerc20PermitWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20PermitABI, TFunctionName>, 'abi'> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc20PermitABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc20PermitABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareIerc20PermitPermit(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>, 'abi' | 'functionName'> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lcrABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lcrABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>, 'abi' | 'address'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    ...config,
  } as UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof lcrABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof lcrABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof lcrABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof lcrABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof lcrABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof lcrABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof lcrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lcrABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lcrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lcrABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof lcrABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lcrABI, TFunctionName, TMode>({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lcrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lcrABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof lcrABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lcrABI, 'approve', TMode>({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lcrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lcrABI, 'decreaseAllowance'>['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof lcrABI, 'decreaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lcrABI, 'decreaseAllowance', TMode>({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lcrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lcrABI, 'increaseAllowance'>['request']['abi'],
        'increaseAllowance',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof lcrABI, 'increaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lcrABI, 'increaseAllowance', TMode>({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lcrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lcrABI, 'transfer'>['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof lcrABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lcrABI, 'transfer', TMode>({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lcrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lcrABI, 'transferFrom'>['request']['abi'],
        'transferFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof lcrABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lcrABI, 'transferFrom', TMode>({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lcrABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function usePrepareLcrWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof lcrABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof lcrABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function usePrepareLcrApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof lcrABI, 'approve'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lcrABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function usePrepareLcrDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lcrABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lcrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lcrABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function usePrepareLcrIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lcrABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lcrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lcrABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function usePrepareLcrTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof lcrABI, 'transfer'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lcrABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lcrABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function usePrepareLcrTransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof lcrABI, 'transferFrom'>, 'abi' | 'address' | 'functionName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lcrABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lcrABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof lcrABI, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    ...config,
  } as UseContractEventConfig<typeof lcrABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lcrABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrApprovalEvent(
  config: Omit<UseContractEventConfig<typeof lcrABI, 'Approval'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof lcrABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lcrABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x56349DA77a7D8fDB892213D7B59fA5bB78EF54CE)
 */
export function useLcrTransferEvent(
  config: Omit<UseContractEventConfig<typeof lcrABI, 'Transfer'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lcrAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lcrABI,
    address: lcrAddress[chainId as keyof typeof lcrAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof lcrABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>, 'abi' | 'address'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"MAX_TREASURY_FEE"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionMaxTreasuryFee<
  TFunctionName extends 'MAX_TREASURY_FEE',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'MAX_TREASURY_FEE',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"adminAddress"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionAdminAddress<
  TFunctionName extends 'adminAddress',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'adminAddress',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"bufferSeconds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionBufferSeconds<
  TFunctionName extends 'bufferSeconds',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'bufferSeconds',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"claimable"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionClaimable<
  TFunctionName extends 'claimable',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'claimable',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"currentEpoch"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionCurrentEpoch<
  TFunctionName extends 'currentEpoch',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'currentEpoch',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"genesisLockOnce"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionGenesisLockOnce<
  TFunctionName extends 'genesisLockOnce',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'genesisLockOnce',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"genesisStartOnce"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionGenesisStartOnce<
  TFunctionName extends 'genesisStartOnce',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'genesisStartOnce',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"getUserRounds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionGetUserRounds<
  TFunctionName extends 'getUserRounds',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'getUserRounds',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"getUserRoundsLength"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionGetUserRoundsLength<
  TFunctionName extends 'getUserRoundsLength',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'getUserRoundsLength',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"intervalSeconds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionIntervalSeconds<
  TFunctionName extends 'intervalSeconds',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'intervalSeconds',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"ledger"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionLedger<
  TFunctionName extends 'ledger',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'ledger',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"minBetAmount"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionMinBetAmount<
  TFunctionName extends 'minBetAmount',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'minBetAmount',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"operatorAddress"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionOperatorAddress<
  TFunctionName extends 'operatorAddress',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'operatorAddress',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"oracle"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionOracle<
  TFunctionName extends 'oracle',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'oracle',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"oracleLatestRoundId"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionOracleLatestRoundId<
  TFunctionName extends 'oracleLatestRoundId',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'oracleLatestRoundId',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"oracleUpdateAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionOracleUpdateAllowance<
  TFunctionName extends 'oracleUpdateAllowance',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'oracleUpdateAllowance',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"paused"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionPaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'paused',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"refundable"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionRefundable<
  TFunctionName extends 'refundable',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'refundable',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"rounds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionRounds<
  TFunctionName extends 'rounds',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'rounds',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"token"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"treasuryAmount"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionTreasuryAmount<
  TFunctionName extends 'treasuryAmount',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'treasuryAmount',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"treasuryFee"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionTreasuryFee<
  TFunctionName extends 'treasuryFee',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'treasuryFee',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"userRounds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionUserRounds<
  TFunctionName extends 'userRounds',
  TSelectData = ReadContractResult<typeof lucroPredictionABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'userRounds',
    ...config,
  } as UseContractReadConfig<typeof lucroPredictionABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof lucroPredictionABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, TFunctionName, TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"betBear"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionBetBear<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'betBear'>['request']['abi'],
        'betBear',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'betBear' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'betBear', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'betBear'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'betBear', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'betBear',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"betBull"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionBetBull<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'betBull'>['request']['abi'],
        'betBull',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'betBull' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'betBull', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'betBull'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'betBull', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'betBull',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"claim"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionClaim<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'claim'>['request']['abi'],
        'claim',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'claim' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'claim', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'claim'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'claim', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'claim',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"claimTreasury"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionClaimTreasury<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'claimTreasury'>['request']['abi'],
        'claimTreasury',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'claimTreasury' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'claimTreasury', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'claimTreasury'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'claimTreasury', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'claimTreasury',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"executeRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionExecuteRound<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'executeRound'>['request']['abi'],
        'executeRound',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'executeRound' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'executeRound', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'executeRound'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'executeRound', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'executeRound',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"genesisLockRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionGenesisLockRound<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'genesisLockRound'>['request']['abi'],
        'genesisLockRound',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'genesisLockRound' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'genesisLockRound', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'genesisLockRound'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'genesisLockRound', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'genesisLockRound',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"genesisStartRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionGenesisStartRound<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'genesisStartRound'>['request']['abi'],
        'genesisStartRound',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'genesisStartRound' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'genesisStartRound', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'genesisStartRound'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'genesisStartRound', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'genesisStartRound',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionPause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'pause'>['request']['abi'],
        'pause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'pause' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'pause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'pause'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'pause', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'pause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"recoverToken"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionRecoverToken<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'recoverToken'>['request']['abi'],
        'recoverToken',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'recoverToken' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'recoverToken', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'recoverToken'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'recoverToken', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'recoverToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'renounceOwnership', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionSetAdmin<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'setAdmin'>['request']['abi'],
        'setAdmin',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setAdmin' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'setAdmin', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setAdmin'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'setAdmin', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setAdmin',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setBufferAndIntervalSeconds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionSetBufferAndIntervalSeconds<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'setBufferAndIntervalSeconds'>['request']['abi'],
        'setBufferAndIntervalSeconds',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setBufferAndIntervalSeconds' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'setBufferAndIntervalSeconds', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBufferAndIntervalSeconds'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'setBufferAndIntervalSeconds', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setBufferAndIntervalSeconds',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setMinBetAmount"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionSetMinBetAmount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'setMinBetAmount'>['request']['abi'],
        'setMinBetAmount',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setMinBetAmount' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'setMinBetAmount', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setMinBetAmount'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'setMinBetAmount', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setMinBetAmount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setOperator"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionSetOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'setOperator'>['request']['abi'],
        'setOperator',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setOperator' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'setOperator', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setOperator'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'setOperator', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setOperator',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setOracle"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionSetOracle<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'setOracle'>['request']['abi'],
        'setOracle',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setOracle' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'setOracle', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setOracle'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'setOracle', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setOracle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setOracleUpdateAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionSetOracleUpdateAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'setOracleUpdateAllowance'>['request']['abi'],
        'setOracleUpdateAllowance',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setOracleUpdateAllowance' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'setOracleUpdateAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setOracleUpdateAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'setOracleUpdateAllowance', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setOracleUpdateAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setTreasuryFee"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionSetTreasuryFee<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'setTreasuryFee'>['request']['abi'],
        'setTreasuryFee',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setTreasuryFee' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'setTreasuryFee', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setTreasuryFee'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'setTreasuryFee', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setTreasuryFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'transferOwnership', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionUnpause<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof lucroPredictionAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof lucroPredictionABI, 'unpause'>['request']['abi'],
        'unpause',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'unpause' }
    : UseContractWriteConfig<typeof lucroPredictionABI, 'unpause', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'unpause'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof lucroPredictionABI, 'unpause', TMode>({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'unpause',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof lucroPredictionABI, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"betBear"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionBetBear(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'betBear'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'betBear',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'betBear'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"betBull"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionBetBull(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'betBull'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'betBull',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'betBull'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"claim"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionClaim(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'claim'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'claim',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'claim'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"claimTreasury"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionClaimTreasury(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'claimTreasury'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'claimTreasury',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'claimTreasury'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"executeRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionExecuteRound(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'executeRound'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'executeRound',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'executeRound'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"genesisLockRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionGenesisLockRound(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'genesisLockRound'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'genesisLockRound',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'genesisLockRound'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"genesisStartRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionGenesisStartRound(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'genesisStartRound'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'genesisStartRound',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'genesisStartRound'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"pause"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionPause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'pause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'pause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'pause'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"recoverToken"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionRecoverToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'recoverToken'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'recoverToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'recoverToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setAdmin"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionSetAdmin(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setAdmin'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setAdmin',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setAdmin'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setBufferAndIntervalSeconds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionSetBufferAndIntervalSeconds(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setBufferAndIntervalSeconds'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setBufferAndIntervalSeconds',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setBufferAndIntervalSeconds'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setMinBetAmount"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionSetMinBetAmount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setMinBetAmount'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setMinBetAmount',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setMinBetAmount'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setOperator"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionSetOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setOperator'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setOperator',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setOperator'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setOracle"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionSetOracle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setOracle'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setOracle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setOracle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setOracleUpdateAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionSetOracleUpdateAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setOracleUpdateAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setOracleUpdateAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setOracleUpdateAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"setTreasuryFee"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionSetTreasuryFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setTreasuryFee'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'setTreasuryFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'setTreasuryFee'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lucroPredictionABI}__ and `functionName` set to `"unpause"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function usePrepareLucroPredictionUnpause(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'unpause'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    functionName: 'unpause',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lucroPredictionABI, 'unpause'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"BetBear"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionBetBearEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'BetBear'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'BetBear',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'BetBear'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"BetBull"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionBetBullEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'BetBull'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'BetBull',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'BetBull'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"Claim"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionClaimEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'Claim'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'Claim',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'Claim'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"EndRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionEndRoundEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'EndRound'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'EndRound',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'EndRound'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"LockRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionLockRoundEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'LockRound'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'LockRound',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'LockRound'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"NewAdminAddress"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionNewAdminAddressEvent(
  config: Omit<
    UseContractEventConfig<typeof lucroPredictionABI, 'NewAdminAddress'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'NewAdminAddress',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'NewAdminAddress'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"NewBufferAndIntervalSeconds"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionNewBufferAndIntervalSecondsEvent(
  config: Omit<
    UseContractEventConfig<typeof lucroPredictionABI, 'NewBufferAndIntervalSeconds'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'NewBufferAndIntervalSeconds',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'NewBufferAndIntervalSeconds'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"NewMinBetAmount"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionNewMinBetAmountEvent(
  config: Omit<
    UseContractEventConfig<typeof lucroPredictionABI, 'NewMinBetAmount'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'NewMinBetAmount',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'NewMinBetAmount'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"NewOperatorAddress"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionNewOperatorAddressEvent(
  config: Omit<
    UseContractEventConfig<typeof lucroPredictionABI, 'NewOperatorAddress'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'NewOperatorAddress',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'NewOperatorAddress'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"NewOracle"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionNewOracleEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'NewOracle'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'NewOracle',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'NewOracle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"NewOracleUpdateAllowance"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionNewOracleUpdateAllowanceEvent(
  config: Omit<
    UseContractEventConfig<typeof lucroPredictionABI, 'NewOracleUpdateAllowance'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'NewOracleUpdateAllowance',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'NewOracleUpdateAllowance'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"NewTreasuryFee"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionNewTreasuryFeeEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'NewTreasuryFee'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'NewTreasuryFee',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'NewTreasuryFee'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof lucroPredictionABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"Pause"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionPauseEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'Pause'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'Pause',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'Pause'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"Paused"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionPausedEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'Paused'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'Paused',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'Paused'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"RewardsCalculated"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionRewardsCalculatedEvent(
  config: Omit<
    UseContractEventConfig<typeof lucroPredictionABI, 'RewardsCalculated'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof lucroPredictionAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'RewardsCalculated',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'RewardsCalculated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"StartRound"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionStartRoundEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'StartRound'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'StartRound',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'StartRound'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"TokenRecovery"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionTokenRecoveryEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'TokenRecovery'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'TokenRecovery',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'TokenRecovery'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"TreasuryClaim"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionTreasuryClaimEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'TreasuryClaim'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'TreasuryClaim',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'TreasuryClaim'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"Unpause"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionUnpauseEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'Unpause'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'Unpause',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'Unpause'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lucroPredictionABI}__ and `eventName` set to `"Unpaused"`.
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x22A43cFfc56b03804927d177Bbb586C1735341Ab)
 */
export function useLucroPredictionUnpausedEvent(
  config: Omit<UseContractEventConfig<typeof lucroPredictionABI, 'Unpaused'>, 'abi' | 'address' | 'eventName'> & {
    chainId?: keyof typeof lucroPredictionAddress
  } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: lucroPredictionABI,
    address: lucroPredictionAddress[chainId as keyof typeof lucroPredictionAddress],
    eventName: 'Unpaused',
    ...config,
  } as UseContractEventConfig<typeof lucroPredictionABI, 'Unpaused'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: ownableABI, ...config } as UseContractReadConfig<
    typeof ownableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: ownableABI, functionName: 'owner', ...config } as UseContractReadConfig<
    typeof ownableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, TFunctionName, TMode>({ abi: ownableABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useOwnableRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, 'renounceOwnership'>['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'renounceOwnership', TMode>({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOwnableTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, 'transferOwnership'>['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'transferOwnership', TMode>({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function usePrepareOwnableWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>, 'abi'> = {} as any,
) {
  return usePrepareContractWrite({ abi: ownableABI, ...config } as UsePrepareContractWriteConfig<
    typeof ownableABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareOwnableRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOwnableTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ownableABI, TEventName>, 'abi'> = {} as any,
) {
  return useContractEvent({ abi: ownableABI, ...config } as UseContractEventConfig<typeof ownableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOwnableOwnershipTransferredEvent(
  config: Omit<UseContractEventConfig<typeof ownableABI, 'OwnershipTransferred'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: ownableABI, eventName: 'OwnershipTransferred', ...config } as UseContractEventConfig<
    typeof ownableABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pausableABI}__.
 */
export function usePausableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof pausableABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof pausableABI, TFunctionName, TSelectData>, 'abi'> = {} as any) {
  return useContractRead({ abi: pausableABI, ...config } as UseContractReadConfig<
    typeof pausableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pausableABI}__ and `functionName` set to `"paused"`.
 */
export function usePausablePaused<
  TFunctionName extends 'paused',
  TSelectData = ReadContractResult<typeof pausableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pausableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({ abi: pausableABI, functionName: 'paused', ...config } as UseContractReadConfig<
    typeof pausableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pausableABI}__.
 */
export function usePausableEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof pausableABI, TEventName>, 'abi'> = {} as any,
) {
  return useContractEvent({ abi: pausableABI, ...config } as UseContractEventConfig<typeof pausableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pausableABI}__ and `eventName` set to `"Paused"`.
 */
export function usePausablePausedEvent(
  config: Omit<UseContractEventConfig<typeof pausableABI, 'Paused'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: pausableABI, eventName: 'Paused', ...config } as UseContractEventConfig<
    typeof pausableABI,
    'Paused'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link pausableABI}__ and `eventName` set to `"Unpaused"`.
 */
export function usePausableUnpausedEvent(
  config: Omit<UseContractEventConfig<typeof pausableABI, 'Unpaused'>, 'abi' | 'eventName'> = {} as any,
) {
  return useContractEvent({ abi: pausableABI, eventName: 'Unpaused', ...config } as UseContractEventConfig<
    typeof pausableABI,
    'Unpaused'
  >)
}
