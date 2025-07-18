# Blockchain based Data Integrity Verification for IOT Communication
This project aims to secure IoT-generated data using blockchain technology by verifying file integrity through SHA-256 hashing and Ethereum smart contracts. In IoT-based environments like smart cities, healthcare, and industrial automation, data is often sensitive and prone to tampering when stored in centralized servers.

To eliminate risks like unauthorized modifications, data loss, or manipulation, this system introduces a decentralized approach that stores a unique hash of each file on the Ethereum blockchain. Any tampering in the original file results in a hash mismatch, making alterations instantly detectable.

🎯 Key Objectives
Ensure authenticity and tamper-proofing of IoT data.

Replace centralized verification with a decentralized blockchain system.

Integrate file verification into a simple web-based platform using smart contracts.

⚙️ How It Works
User Uploads a File
→ The system reads the file and generates a SHA-256 hash of its contents.

Hash Storage via Smart Contract
→ The hash is stored on the Ethereum blockchain using a Solidity smart contract.

File Verification
→ Later, the same file can be re-uploaded. The system recalculates the SHA-256 hash and compares it with the blockchain-stored value.

Tamper Detection
→ If the hashes match, the file is verified. If they don’t, it is marked as tampered or altered.

🔐 Why Blockchain?
Traditional systems store and verify files using central databases, which can be hacked or manipulated. Blockchain provides:

Decentralization — no single point of failure

Immutability — stored hashes can't be altered

Transparency — publicly verifiable hash records

Security — cryptographic integrity

💡 Features
🔒 Tamper detection using SHA-256 hash verification

⚡ Ethereum smart contract integration using Solidity

🔗 Real-time file-to-blockchain comparison

🌐 Simple web interface for uploading and verifying files

🧩 Local blockchain simulation using Ganache

🔑 Secure transaction signing with MetaMask

🧰 Tech Stack
👨‍💻 Frontend
HTML

CSS

JavaScript

Web3.js (for blockchain connection)

🧠 Backend
Python (Flask)

🔗 Blockchain
Ethereum

Solidity (Smart Contract Language)

Ganache (Local blockchain simulation)

MetaMask (Wallet for transaction signing)

🔑 Hashing Algorithm
SHA-256 (Cryptographic hash function)
<img width="1358" height="673" alt="Screenshot 2025-04-24 122433" src="https://github.com/user-attachments/assets/c422ff5d-337b-4e95-9763-f26d5c47630a" />
<img width="1362" height="673" alt="Screenshot 2025-04-24 122456" src="https://github.com/user-attachments/assets/cc993d8a-215d-4f65-b44d-dc209a55e3a4" />
<img width="1356" height="674" alt="Screenshot 2025-04-24 123959" src="https://github.com/user-attachments/assets/d46a7bdd-92ab-4ad0-8767-437ce8876cdf" />
<img width="1355" height="671" alt="Screenshot 2025-04-24 124022" src="https://github.com/user-attachments/assets/478639cb-6eec-4fbb-bda9-082f09e3fd0d" />
<img width="1357" height="664" alt="Screenshot 2025-04-24 124111" src="https://github.com/user-attachments/assets/6ac694d5-1c9b-4176-b35b-d235fda9a541" />
<img width="1362" height="678" alt="Screenshot 2025-04-24 124150" src="https://github.com/user-attachments/assets/dbbf9679-6558-4e14-a1d3-6525e1538b5b" />
<img width="1353" height="667" alt="Screenshot 2025-04-24 124220" src="https://github.com/user-attachments/assets/b05d3e31-9f10-400c-8698-1dc9578aa5c3" />
<img width="1352" height="675" alt="Screenshot 2025-04-24 124255" src="https://github.com/user-attachments/assets/560db2a5-5ccc-4aaa-9162-ec036258a377" />
<img width="1357" height="663" alt="Screenshot 2025-04-24 124309" src="https://github.com/user-attachments/assets/358edef4-661d-44c3-8cab-f1838478529c" />

🚀 Getting Started
📦 Prerequisites
Python 3

Flask

Node.js & npm

MetaMask extension

Ganache (Desktop or CLI)

Remix IDE (for deploying smart contracts)

🧪 Setup Instructions
Clone the repository
git clone https://github.com/ychandana7/blockchain-iot-data-integrity.git
cd blockchain-iot-data-integrity
Install Python dependencies
pip install flask
Start Ganache (local blockchain)

Deploy the Smart Contract

Use Remix IDE with Ganache injected provider

Copy the contract address and ABI

Update contract details in Web3.js frontend file

Run Flask server
python app.py
http://localhost:5000
🧪 Test Cases
Case	Input File	   Result
1	   Original.txt	 ✅ Verified
2	   Modified.txt	 ❌ Tampered
