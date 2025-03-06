⚡ 0G-Lab Auto Transaction Bot

🔥 Automate Your Daily Transactions on 0G Labs Testnet!

No more manual transactions! This bot ensures your wallet stays active by automating transactions on the 0G Labs Testnet with randomized activity for a natural on-chain footprint.

## 📢 Join Our Community

# Telegram Channel: .[Channel](https://t.me/Offical_Im_kazuha)
# GitHub Repository: [OGLAB](https://github.com/Kazuha787/OG-Lab-Auto-Bot.git)

## Features

✅ Multi-Wallet Support – Load multiple wallets from .env
✅ Randomized Transactions – Varying amounts, timings & recipients
✅ Optimized Gas Fees – Uses ethers.js for cost-efficient transactions
✅ Fully Automated – Runs continuously with natural delays
✅ Hacker-Style CLI Animations – Visual progress bar, typing effects & colorful logs
✅ Open-Source & Customizable – Modify settings to match your needs


---

 ## Quick Setup Guide

1️⃣ Clone the Repository

```sh
git clone https://github.com/Kazuha787/0G-Lab-Auto-Bot.git
```

2️⃣ Navigate to the Project Folder
```sh
cd 0G-Lab-Auto-Bot
```

3️⃣ Install Required Dependencies
```sh
npm install
```

4️⃣ Set Up Your Wallets

Open the .env file to store your private keys securely.
```sh
nano .env
```
🔹 Example `.env` format:

PRIVATE_KEYS=`["0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890", 
               "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"]`

⚠ Important: Always keep your private keys private! Do not share them with anyone.

5️⃣ Start the Bot & Begin Transactions
```sh
node index.js 
```

---

🛠 How It Works?

1️⃣ Loads wallets from .env (supports multiple accounts)
2️⃣ Checks wallet balance before sending transactions
3️⃣ Randomizes transactions (number, amount & delay)
4️⃣ Broadcasts transactions with optimized gas fees
5️⃣ Repeats the cycle with auto-wait periods

📌 This makes your activity look organic instead of automated!


---

⚡ Advanced Configuration

Want more customization? Modify these environment variables in .env:

🔹 Want even more control? You can modify index.js to customize gas settings, transaction intervals, or logging style.

## 📌 Advanced Configuration Chart for `index.js`

| **Section**        | **Description**                                | **Editable Values**                      | **Example** |
|--------------------|----------------------------------------------|------------------------------------------|------------|
| **RPC Settings**   | Defines the testnet RPC URL and Chain ID     | `RPC_URL`, `CHAIN_ID`                   | `"https://evmrpc-testnet.0g.ai"`, `16600` |
| **Wallet Handling**| Loads multiple wallets from `.env`           | `PRIVATE_KEYS` (Array of Private Keys)   | `["0x123...", "0x456..."]` |
| **Balance Check**  | Verifies if wallet has enough funds          | Minimum balance threshold                | `0.0001 ETH` |
| **Randomization**  | Generates random transaction amounts & delays | `MinTxAmount`, `MaxTxAmount`, `DelayRange` | `0.000001 - 0.0001 ETH`, `60-120s` |
| **Logging & UI**   | Colorful logs and animations                 | Chalk styles & text effects              | `chalk.green()`, `typingEffect()` |
| **Error Handling** | Handles API failures & invalid wallets       | Try/Catch blocks & graceful exits        | Auto-retry on failure |
| **Loop Control**   | Defines execution time & delay between loops | `LoopInterval` in ms                     | `60000 - 120000 ms` |

📢 Support & Contact

🔹 Developer: Kazuha
🔹 GitHub: Kazuha787
🔹 Need Help? Open an issue on GitHub


---

🎯 Why Use This Bot?

✅ Hands-free automation – Set it up once & let it run
✅ Looks like natural activity – Random delays & transactions
✅ Improves on-chain presence – Stay active in testnet programs
✅ Safe & efficient – Uses best practices for secure execution

🔥 Stay ahead in the testnet game! Let this bot do the work while you focus on other airdrop opportunities. 🚀


---

📅 Last updated: Thu Mar 6, 2025


---

This fully customized README makes your project unique, more professional, and easy to follow. 🚀 What do you think?

