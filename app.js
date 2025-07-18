// Ethereum Setup and Web3.js Integration
if (typeof window.ethereum !== 'undefined') {
  const web3 = new Web3(window.ethereum);
  document.getElementById('ethereumStatus').innerText = "MetaMask is connected!";
} else {
  document.getElementById('ethereumStatus').innerText = "MetaMask is not connected!";
}

// Contract ABI and Address
const contractAddress = '0xbd027329e9c3b155a4753c9aa4191c63bf9e6bb0'; // Your deployed contract address
const ABI = [
  // Copy your contract ABI here (generated from Remix after deploying)
];

const contract = new web3.eth.Contract(ABI, contractAddress);

// Function to generate SHA-256 hash from uploaded file
async function generateHash() {
  const fileInput = document.getElementById('dataFile');
  const file = fileInput.files[0];
  
  if (!file) {
      alert("Please upload a file first.");
      return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
      const fileContent = event.target.result;
      const hash = web3.utils.sha3(fileContent);  // Generate SHA-256 hash of the file content
      console.log("Generated Hash:", hash);
      storeHashOnBlockchain(hash);
  };
  reader.readAsText(file);
}

// Function to store the hash on the blockchain
async function storeHashOnBlockchain(hash) {
  const accounts = await web3.eth.requestAccounts(); // Request MetaMask account

  try {
      await contract.methods.storeHash(hash).send({ from: accounts[0] });
      console.log("Hash stored successfully on blockchain!");
      document.getElementById('result').innerHTML = "<span style='color: green;'>✅ Hash stored successfully on the blockchain.</span>";
      retrieveHashFromBlockchain();
  } catch (error) {
      console.error("Error storing hash on blockchain:", error);
      document.getElementById('result').innerHTML = "<span style='color: red;'>❌ Error storing hash on blockchain.</span>";
  }
}

// Function to retrieve stored hash from blockchain
async function retrieveHashFromBlockchain() {
  try {
      const storedHash = await contract.methods.getHash().call();
      console.log("Stored Hash:", storedHash);
      compareHashes(storedHash);
  } catch (error) {
      console.error("Error retrieving hash from blockchain:", error);
  }
}

// Function to compare generated hash with stored hash
function compareHashes(storedHash) {
  const fileInput = document.getElementById('dataFile');
  const file = fileInput.files[0];
  
  const reader = new FileReader();
  reader.onload = function(event) {
      const fileContent = event.target.result;
      const generatedHash = web3.utils.sha3(fileContent); // Hash generated from uploaded file
      
      if (generatedHash === storedHash) {
          document.getElementById('result').innerHTML = "<span style='color: green;'>✅ Data is authentic.</span>";
      } else {
          document.getElementById('result').innerHTML = "<span style='color: red;'>❌ Data has been tampered.</span>";
      }
  };
  reader.readAsText(file);
}
