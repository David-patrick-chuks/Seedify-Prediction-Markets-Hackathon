
# Ying & Yang Prediction
🔮 **A simple, decentralized UP/DOWN prediction market on BNB Chain**

## Overview
Ying & Yang Prediction is a fast, rolling prediction market built on BNB Chain. Users can stake BNB on the price movement of assets like BNBUSD, BTCUSD, ETHUSD and win if their prediction matches the market movement. Each round lasts ~5 minutes, making it highly engaging for short-term traders and crypto enthusiasts.

This project demonstrates real-time price tracking, smart contract execution, and oracle-based settlements, combining frontend interactivity with secure blockchain mechanics.

## Features
- **Fast Rounds**: Rolling ~5-minute rounds for quick predictions.
- **UP/DOWN Betting**: Choose your direction for each market.
- **Stake Any Amount**: Flexible BNB staking.
- **Oracle-Based Settlement**: Uses Chainlink price feeds for live Lock and Close prices (~20s update).
- **Dynamic Payouts**: Winners share the total pool proportionally.
- **Fee Mechanism**: 3% fee applied to each round for sustainability.
- **Frontend Integration**: Real-time market carousel with live odds and historical outcomes.
- **Claim Mechanism**: Secure claim process for winning users.

## How It Works
1. **Select Asset**: Choose from BNBUSD, BTCUSD, or ETHUSD.
2. **Pick Direction**: UP or DOWN.
3. **Stake BNB**: Lock your BNB into the market.
4. **Live Round**: Market runs for ~5 minutes.
5. **Settlement**: Chainlink oracle sets final price.
6. **Payouts**:
   - **Win**: Receive proportion of total pool (minus 3% fee)
   - **Lose**: Stake goes to the house
   - **Tie**: House keeps all bets
   - **Cancelled**: Bets refunded

### Payout Formula
```
UP Payout    = Total Pool ÷ UP Pool
DOWN Payout  = Total Pool ÷ DOWN Pool
```

- **Smart Contracts**: Handle round creation, user bets, payouts, and fee collection.
- **Oracle Integration**: Chainlink feeds ensure price accuracy for each market round.
- **Frontend**: User-friendly interface showing live rounds, market history, and instant betting actions.
- **Backend (optional)**: Tracks user statistics and market metadata for analytics.

## Demo
*(replace with your demo GIF or video)*

- Browse Live, Next, and Future rounds in a scrollable carousel.
- Place UP/DOWN bets instantly with a single click.
- Track round metadata and odds in real-time.

## Getting Started
### Prerequisites
- Node.js >= 18
- Yarn or NPM
- BNB Chain Wallet (MetaMask, TrustWallet, etc.)
- BNB testnet tokens for testing (if deploying on testnet)

### Install & Run
```bash
git clone https://github.com/David-patrick-chuks/Seedify-Prediction-Markets-Hackathon.git
cd ying-yang-prediction

#980 Install dependencies
yarn install

# Run frontend
yarn dev
```

## Usage
1. Connect your wallet to the BNB Chain network.
2. Select an asset (BNBUSD, BTCUSD, ETHUSD).
3. Pick UP or DOWN and stake your BNB.
4. Wait for round completion (~5 minutes).
5. Claim your winnings (if successful).


## License
MIT License.

## Contact
- Telegram: [YourTelegramHandle]
- Twitter: [YourTwitterHandle]