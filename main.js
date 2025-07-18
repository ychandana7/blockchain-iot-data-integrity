const contractAddress = "0xcc56136ad4265c5b54346a49a8eac793501f6ed5"; // Replace with your deployed address
const contractABI = [
  {
    "inputs": [{"internalType": "string", "name": "_hash", "type": "string"}],
    "name": "storeHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getHash",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
];

let web3;
let contract;
let account;
let fileHash = "";

window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    alert("Please install MetaMask to use this DApp");
  }
});

document.getElementById("connectButton").addEventListener("click", async () => {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    contract = new web3.eth.Contract(contractABI, contractAddress);
    document.getElementById("connectButton").innerText = `✅ Connected: ${account.slice(0, 6)}...`;
  } catch (error) {
    console.error("MetaMask connection failed:", error);
  }
});

document.getElementById("generateHash").addEventListener("click", async () => {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please select a file first");
    return;
  }

  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  fileHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  document.getElementById("hashDisplay").innerText = `🔐 SHA-256 Hash: ${fileHash}`;
});

document.getElementById("storeHash").addEventListener("click", async () => {
  if (!fileHash) {
    alert("Please generate the hash first.");
    return;
  }

  try {
    await contract.methods.storeHash(fileHash).send({ from: account });
    document.getElementById("output").innerText = "✅ Hash stored on blockchain!";
  } catch (error) {
    console.error(error);
    document.getElementById("output").innerText = "❌ Error storing hash.";
  }
});

document.getElementById("getHash").addEventListener("click", async () => {
  try {
    const result = await contract.methods.getHash().call();
    document.getElementById("output").innerText = `📦 Stored Hash: ${result}`;
  } catch (error) {
    console.error(error);
    document.getElementById("output").innerText = "❌ Error retrieving hash.";
  }
});
