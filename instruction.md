# Decentralized File Storage Project

## **Project Overview**

This project implements a **decentralized file storage system** using **Ethereum Smart Contracts**, **IPFS**, and **Pinata**. The system allows users to securely upload, share, and manage files in a decentralized manner. A **4-digit key** is used to grant and verify access to shared files, ensuring that only authorized users can access them. The project focuses on simplicity and security, leveraging blockchain for access control and IPFS for decentralized file storage.

---

## **Project Details**

### **Key Features**
1. **File Upload**:
   - Users can upload files to IPFS via Pinata.
   - File metadata (e.g., name, description, timestamp) is stored in a smart contract.
   - The IPFS hash is stored as-is (no encryption) and displayed in the frontend.

2. **Access Control**:
   - File owners can grant access to other users by specifying:
     - The receiver's Ethereum address.
     - The file's IPFS hash.
     - A 4-digit key.
   - Only users with the correct 4-digit key can access the shared file.

3. **Shared Access List**:
   - File owners can view a list of addresses they have granted access to for each file.
   - This helps owners manage and track who has access to their files.

4. **Direct Download**:
   - Files are downloaded directly from IPFS without opening in the browser.
   - This ensures a seamless user experience.

5. **MetaMask Integration**:
   - Users connect their MetaMask wallet to interact with the application.
   - All transactions (e.g., file upload, access granting) are signed using MetaMask.

---

## **Project Functionality**

### **1. File Upload**
- Users upload files through the frontend interface.
- The file is uploaded to IPFS using Pinata, and the IPFS hash is returned.
- The file metadata (name, description, timestamp, and IPFS hash) is stored in the smart contract.
- The uploaded file is displayed in a table on the frontend, showing the IPFS hash and other details.

### **2. Grant Access**
- File owners can share access to their files with other users.
- To grant access, the owner specifies:
  - The receiver's Ethereum address.
  - The file's IPFS hash.
  - A 4-digit key (chosen by the owner).
- The smart contract stores this information, linking the receiver's address, IPFS hash, and 4-digit key.

### **3. Access Shared File**
- Receivers can access shared files by providing:
  - The sender's Ethereum address.
  - The file's IPFS hash.
  - The 4-digit key.
- The smart contract verifies the provided key against the stored key.
- If the key matches, the file details are added to the receiver's file list, and they can download the file.

### **4. Download File**
- When a user requests to download a file:
  - The file is fetched directly from IPFS using the stored IPFS hash.
  - The file is downloaded to the user's device without opening it in the browser.

### **5. Shared Access List**
- File owners can view a list of addresses they have granted access to for each file.
- This feature helps owners manage permissions and revoke access if needed.

---

## **Project Folder Architecture**

```
project/
│
├── contracts/                  # Contains Solidity smart contracts
│   └── FileStorage.sol         # Main smart contract for file storage and access control
│
├── build/                      # Generated after compiling the smart contract
│   └── contracts/              # Compiled JSON artifacts
│       └── FileStorage.json    # ABI and bytecode of the smart contract
│
├── app.js                      # Frontend JavaScript logic
├── index.html                  # Frontend HTML structure
└── README.md                   # Project documentation (this file)
```

---

## **Folder and Code Details**

### **1. Smart Contract (`contracts/FileStorage.sol`)**
The smart contract is the backbone of the system, handling file storage, access control, and shared access lists.

#### **Key Data Structures**
- **File Struct**:
  - Stores file metadata, including:
    - IPFS hash.
    - File name.
    - File description.
    - Timestamp.
    - Owner's address.
- **Access Mapping**:
  - Maps a file's IPFS hash to a list of addresses that have been granted access.
- **Key Mapping**:
  - Maps a file's IPFS hash and receiver's address to the 4-digit key.

#### **Key Functions**
- **`uploadFile`**:
  - Allows users to upload file metadata to the smart contract.
  - Stores the IPFS hash, name, description, and timestamp.
- **`grantAccess`**:
  - Grants access to a specific user for a file.
  - Stores the receiver's address, IPFS hash, and 4-digit key.
- **`hasAccess`**:
  - Verifies if a user has access to a file by checking the provided 4-digit key.
- **`getFileDetails`**:
  - Retrieves file metadata by IPFS hash.
- **`getFileAccessList`**:
  - Retrieves the list of addresses granted access to a specific file.

---

### **2. Frontend (`index.html` and `app.js`)**
The frontend is built using HTML, CSS (Bootstrap), and JavaScript. It interacts with the smart contract and IPFS via Web3.js and Pinata.

#### **Key Components**
1. **Navbar**:
   - Contains buttons to connect MetaMask and share files.
2. **Upload Section**:
   - A form for uploading files, including fields for:
     - File input.
     - File name.
     - File description.
3. **Uploaded Files Table**:
   - Displays a list of uploaded files, including:
     - File name.
     - File description.
     - IPFS hash.
     - Timestamp.
4. **Shared Access List Table**:
   - Displays files shared by the user and the list of addresses granted access.
5. **Access Shared File Section**:
   - A form for receivers to access shared files, including fields for:
     - Sender's Ethereum address.
     - IPFS hash.
     - 4-digit key.
6. **Share Modal**:
   - A modal for file owners to grant access to other users, including fields for:
     - Receiver's Ethereum address.
     - IPFS hash.
     - 4-digit key.

#### **Frontend Workflow**
1. **Connect MetaMask**:
   - Users connect their MetaMask wallet to the application.
   - The frontend initializes a Web3 instance to interact with the smart contract.
2. **Upload File**:
   - Users upload files to IPFS via Pinata.
   - The IPFS hash and metadata are sent to the smart contract.
3. **Grant Access**:
   - File owners use the Share Modal to grant access to other users.
   - The frontend sends the receiver's address, IPFS hash, and 4-digit key to the smart contract.
4. **Access Shared File**:
   - Receivers use the Access Shared File form to request access.
   - The frontend verifies the 4-digit key with the smart contract.
5. **Download File**:
   - Users can download files directly from IPFS using the stored IPFS hash.

---

## **Instructions for Setting Up the Project**

### **Prerequisites**
1. **Node.js and npm**:
   - Install Node.js and npm to manage dependencies and run the project.
2. **Truffle or Hardhat**:
   - Use Truffle or Hardhat for smart contract development and deployment.
3. **Pinata API Account**:
   - Create a Pinata account to upload files to IPFS.
4. **MetaMask**:
   - Install the MetaMask browser extension to interact with the Ethereum blockchain.

### **Steps**
1. **Compile and Deploy the Smart Contract**:
   - Compile the smart contract using Truffle or Hardhat.
   - Deploy the contract to a testnet (e.g., Rinkeby) or a local blockchain.
2. **Set Up the Frontend**:
   - Replace placeholders (e.g., Pinata API key, contract address) in `app.js` with actual values.
   - Serve the frontend using a local server (e.g., `live-server`).
3. **Run the Application**:
   - Open `index.html` in your browser.
   - Connect your MetaMask wallet and interact with the application.

---

## **Conclusion**

This project demonstrates how to build a **decentralized file storage system** using Ethereum smart contracts and IPFS. By leveraging a **4-digit key** for access control, the system ensures that only authorized users can access shared files. The project is designed to be simple, secure, and user-friendly, making it a great starting point for exploring decentralized applications (dApps).

Let me know if you need further assistance!