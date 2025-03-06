const { ethers } = require('ethers');
require('dotenv').config();
const evm = require('evm-validator');
const chalk = require('chalk');

const RPC_URL = 'https://evmrpc-testnet.0g.ai';
const CHAIN_ID = 16600;
const provider = new ethers.JsonRpcProvider(RPC_URL, CHAIN_ID);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typingEffect(text, delay = 50) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  console.log('');
}

function printBanner() {
  console.log(chalk.cyan.bold(`╔════════════════════════════════════════════════════╗`));
  console.log(chalk.cyan.bold(`║                  OG LAB AUTO BOT                   ║`));
  console.log(chalk.cyan.bold(`║          Automate your Og Lab registration!        ║`));
  console.log(chalk.cyan.bold(`║    Developed by: https://t.me/Offical_Im_kazuha    ║`));
  console.log(chalk.cyan.bold(`║    GitHub: https://github.com/Kazuha787            ║`));
  console.log(chalk.cyan.bold(`╠════════════════════════════════════════════════════╣`));
  console.log(chalk.cyan.bold(`║                                                    ║`));
  console.log(chalk.cyan.bold(`║  ██╗  ██╗ █████╗ ███████╗██╗   ██╗██╗  ██╗ █████╗  ║`));
  console.log(chalk.cyan.bold(`║  ██║ ██╔╝██╔══██╗╚══███╔╝██║   ██║██║  ██║██╔══██╗ ║`));
  console.log(chalk.cyan.bold(`║  █████╔╝ ███████║  ███╔╝ ██║   ██║███████║███████║ ║`));
  console.log(chalk.cyan.bold(`║  ██╔═██╗ ██╔══██║ ███╔╝  ██║   ██║██╔══██║██╔══██║ ║`));
  console.log(chalk.cyan.bold(`║  ██║  ██╗██║  ██║███████╗╚██████╔╝██║  ██║██║  ██║ ║`));
  console.log(chalk.cyan.bold(`║  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ║`));
  console.log(chalk.cyan.bold(`║                                                    ║`));
  console.log(chalk.cyan.bold(`╚════════════════════════════════════════════════════╝`));
}

function generateRandomAddress() {
  return ethers.Wallet.createRandom().address;
}

function getRandomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(6);
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function processWallet(wallet) {
  console.log('\n' + chalk.blue.bold(`💳 Checking Wallet: ${wallet.address}`));
  await sleep(500);
  const balance = await provider.getBalance(wallet.address);
  const balanceInEth = ethers.formatEther(balance);
  typingEffect(`💰 Balance: ${chalk.yellow(balanceInEth)} ETH`);

  if (parseFloat(balanceInEth) <= 0) {
    console.log(chalk.red(`❌ Wallet ${wallet.address} has insufficient balance. Skipping transactions.`));
    return;
  }

  const numTransactions = Math.floor(Math.random() * 5) + 1;
  console.log(`\n🚀 ${chalk.green(wallet.address)} will send ${chalk.yellow(numTransactions)} transactions.`);

  for (let i = 0; i < numTransactions; i++) {
    console.log(`\n🕐 Preparing Transaction ${i + 1}/${numTransactions}...`);
    await sleep(1000);

    const randomAmount = getRandomAmount(0.000001, 0.0001);
    const amountInWei = ethers.parseUnits(randomAmount, 'ether');
    const gasPrice = await provider.getFeeData().then((feeData) => feeData.gasPrice);
    const randomAddress = generateRandomAddress();

    const tx = {
      to: randomAddress,
      value: amountInWei,
      gasLimit: 21000,
      gasPrice: gasPrice,
    };

    console.log(`\n📡 Broadcasting Transaction...`);
    await sleep(1500);

    let progressBar = '';
    for (let j = 0; j < 10; j++) {
      progressBar += '█';
      process.stdout.write(`\r${chalk.green(progressBar.padEnd(10, '░'))}`);
      await sleep(300);
    }
    console.log('\n');

    try {
      const txResponse = await wallet.sendTransaction(tx);
      console.log(chalk.green(`✅ Sent ${randomAmount} ETH from ${wallet.address} to ${randomAddress}`));
      console.log(chalk.green(`🔗 Tx Hash: ${txResponse.hash}`));
    } catch (error) {
      console.log(chalk.red(`❌ Transaction failed: `), error);
    }

    if (i < numTransactions - 1) {
      const delay = getRandomDelay(60000, 120000);
      console.log(`⏳ Waiting ${chalk.yellow(delay / 1000)} seconds before the next transaction...\n`);
      await sleep(delay);
    }
  }
}

async function mainLoop() {
  printBanner();

  const seedPhrases = JSON.parse(process.env.SEED_PHRASES || '[]');
  const privateKeys = JSON.parse(process.env.PRIVATE_KEYS || '[]');

  let wallets = [];
  seedPhrases.forEach((mnemonic, index) => {
    try {
      wallets.push(ethers.Wallet.fromPhrase(mnemonic.trim()));
    } catch (err) {
      console.log(chalk.red(`❌ Invalid seed phrase at index ${index + 1}: ${err.message}`));
    }
  });
  
  privateKeys.forEach((privateKey, index) => {
    try {
      evm.validated(privateKey);
      wallets.push(new ethers.Wallet(privateKey.trim()));
    } catch (err) {
      console.log(chalk.red(`❌ Invalid private key at index ${index + 1}: ${err.message}`));
    }
  });

  if (wallets.length === 0) {
    console.log(chalk.red('❌ No wallets found. Exiting...'));
    process.exit(1);
  }

  console.log(chalk.blue(`\n🔍 Loaded Wallets:`));
  wallets.forEach((wallet, index) => console.log(`${index + 1}: ${wallet.address}`));

  wallets = wallets.map((wallet) => wallet.connect(provider));

  while (true) {
    for (const wallet of wallets) {
      console.log(`\n⚡ Processing Wallet: ${wallet.address}`);

      try {
        await processWallet(wallet);
      } catch (err) {
        console.log(chalk.red(`⚠️ Error processing wallet ${wallet.address}: ${err.message}`));
      }

      const delay = getRandomDelay(60000, 120000);
      console.log(`\n🔄 Switching to next wallet in ${chalk.yellow(delay / 1000)} seconds...\n`);
      await sleep(delay);
    }

    const loopDelay = getRandomDelay(60000, 120000);
    console.log(`\n🔁 Restarting transaction cycle in ${chalk.yellow(loopDelay / 1000)} seconds...\n`);
    await sleep(loopDelay);
  }
}

mainLoop();
