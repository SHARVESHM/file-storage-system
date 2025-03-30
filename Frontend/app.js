// Import Web3 library
const web3 = new Web3(window.ethereum);

// Pinata API credentials (Replace with your actual JWT token)
const PINATA_JWT = ""; // Replace with your Pinata JWT token

// Smart contract ABI and address
const contractABI = [

  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "AccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "AccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "FileAccessed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "fileName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "FileUploaded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "accessList",
    "outputs": [
      {
        "internalType": "bool",
        "name": "hasAccess",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "accessKey",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "grantedAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "accessedFiles",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fileAccessList",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "files",
    "outputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fileName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userFiles",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fileName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "uploadFile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "accessKey",
        "type": "string"
      }
    ],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "accessKey",
        "type": "string"
      }
    ],
    "name": "verifyAccess",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "recordFileAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getAccessedFiles",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getFilesByUser",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "getFileDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "fileName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "getFileAccessList",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getAccessDetails",
    "outputs": [
      {
        "internalType": "bool",
        "name": "hasAccess",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "grantedAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
  ] ; // Copy from build/contracts/FileStorage.json
const contractAddress = "0x4Be9b16ef16786FC329e8DB6eBD31958C18255B7"; // Replace with your deployed contract address
let contract;
let accounts;
let isConnected = false;

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Connect to MetaMask
document.getElementById('connectMetamask').addEventListener('click', async () => {
  if (window.ethereum) {
    try {
            showLoadingState('connectMetamask', true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];

      // Initialize the smart contract
      contract = new web3.eth.Contract(contractABI, contractAddress);
            isConnected = true;

            showAlert('success', `Connected to MetaMask with account: ${accounts[0]}`);
            updateConnectedState();
            await loadFilesForAccount(accounts[0]);
    } catch (error) {
            console.error('MetaMask connection error:', error);
            showAlert('error', 'Error connecting to MetaMask: ' + error.message);
        } finally {
            showLoadingState('connectMetamask', false);
    }
  } else {
        showAlert('error', 'MetaMask not detected! Please install MetaMask.');
  }
});

// Upload File to IPFS
document.getElementById('uploadButton').addEventListener('click', async () => {
    if (!isConnected) {
        return showAlert('error', 'Please connect to MetaMask first.');
    }

  const file = document.getElementById('fileInput').files[0];
  const fileName = document.getElementById('fileNameInput').value.trim();
  const description = document.getElementById('descriptionInput').value.trim();

  if (!file || !fileName || !description) {
        return showAlert('error', 'Please select a file and provide a name and description.');
  }

  try {
        showLoadingState('uploadButton', true);
        const fileHash = await uploadToIPFS(file);

    await contract.methods.uploadFile(fileHash, fileName, description).send({
      from: accounts[0],
            gas: 3000000
        });

        showAlert('success', `File uploaded successfully! IPFS Hash: ${fileHash}`);
        await loadFilesForAccount(accounts[0]);
        clearUploadForm();
  } catch (error) {
        console.error('Upload error:', error);
        showAlert('error', 'Error uploading file: ' + error.message);
    } finally {
        showLoadingState('uploadButton', false);
  }
});

// Share File Access
document.getElementById('shareButton').addEventListener('click', () => {
    if (!isConnected) {
        return showAlert('error', 'Please connect to MetaMask first.');
    }
  const modal = new bootstrap.Modal(document.getElementById('shareModal'));
  modal.show();
});

// Grant Access with 4-digit key
document.getElementById('grantAccessButton').addEventListener('click', async () => {
    if (!isConnected) {
        return showAlert('error', 'Please connect to MetaMask first.');
    }

  const receiver = document.getElementById('receiverAddress').value.trim();
  const fileHash = document.getElementById('shareFileHash').value.trim();
    const accessKey = document.getElementById('accessKey').value.trim();

  if (!web3.utils.isAddress(receiver)) {
        return showAlert('error', 'Invalid Ethereum address.');
  }

  if (!fileHash) {
        return showAlert('error', 'Please enter a valid file hash.');
    }

    if (!/^\d{4}$/.test(accessKey)) {
        return showAlert('error', 'Please enter a valid 4-digit access key.');
  }

  try {
        showLoadingState('grantAccessButton', true);
        await contract.methods.grantAccess(fileHash, receiver, accessKey).send({
      from: accounts[0],
            gas: 3000000
        });

        showAlert('success', `Access granted to ${receiver}`);
        await loadFilesForAccount(accounts[0]);
        clearShareForm();
    const modal = bootstrap.Modal.getInstance(document.getElementById('shareModal'));
    modal.hide();
  } catch (error) {
        console.error('Grant access error:', error);
        showAlert('error', 'Error granting access: ' + error.message);
    } finally {
        showLoadingState('grantAccessButton', false);
    }
});

// Access Shared File with 4-digit key
document.getElementById('accessFileButton').addEventListener('click', async () => {
    if (!isConnected) {
        return showAlert('error', 'Please connect to MetaMask first.');
    }

  const sender = document.getElementById('senderAddress').value.trim();
  const fileHash = document.getElementById('fileHashInput').value.trim();
    const accessKey = document.getElementById('accessKeyInput').value.trim();

  if (!web3.utils.isAddress(sender)) {
        return showAlert('error', 'Invalid sender address.');
  }

  if (!fileHash) {
        return showAlert('error', 'Please enter a valid file hash.');
    }

    if (!/^\d{4}$/.test(accessKey)) {
        return showAlert('error', 'Please enter a valid 4-digit access key.');
  }

  try {
        showLoadingState('accessFileButton', true);
        const hasAccess = await contract.methods.verifyAccess(fileHash, accounts[0], accessKey).call();
        
    if (hasAccess) {
            // Record the file access in the smart contract
            await contract.methods.recordFileAccess(fileHash, accounts[0]).send({
                from: accounts[0],
                gas: 3000000
            });

      const fileDetails = await contract.methods.getFileDetails(fileHash).call();
            const accessDetails = await contract.methods.getAccessDetails(fileHash, accounts[0]).call();
            
            addFileToTable(fileDetails, fileHash, accessDetails.grantedAt, true);
            showAlert('success', 'Access verified! File added to your list.');
            clearAccessForm();
            
            // Reload the files to update the table
            await loadFilesForAccount(accounts[0]);
    } else {
            showAlert('error', 'Access denied. Please check your access key.');
    }
  } catch (error) {
        console.error('Access verification error:', error);
        showAlert('error', 'Error verifying access: ' + error.message);
    } finally {
        showLoadingState('accessFileButton', false);
    }
});

// Load files and shared access list
async function loadFilesForAccount(account) {
  try {
        clearTables();
        
        // Get all files (both owned and accessed)
    const fileHashes = await contract.methods.getFilesByUser(account).call();

    if (!Array.isArray(fileHashes) || fileHashes.length === 0) {
            showEmptyState();
      return;
    }

        // Get accessed files to differentiate between owned and accessed files
        const accessedFiles = await contract.methods.getAccessedFiles(account).call();
        const accessedFilesSet = new Set(accessedFiles);

    for (const fileHash of fileHashes) {
      try {
        const fileDetails = await contract.methods.getFileDetails(fileHash).call();
                const isAccessedFile = accessedFilesSet.has(fileHash);
                
                if (isAccessedFile) {
                    const accessDetails = await contract.methods.getAccessDetails(fileHash, account).call();
                    addFileToTable(fileDetails, fileHash, accessDetails.grantedAt, true);
                } else {
                    addFileToTable(fileDetails, fileHash, null, false);
                }

                // Only show access list for files owned by the user
                if (fileDetails.owner === account) {
        const accessList = await contract.methods.getFileAccessList(fileHash).call();
        if (accessList.length > 0) {
                        for (const address of accessList) {
                            const accessDetails = await contract.methods.getAccessDetails(fileHash, address).call();
                            addToSharedAccessTable(fileHash, address, accessDetails);
                        }
                    }
        }
      } catch (error) {
                console.error(`Error loading file details: ${fileHash}`, error);
      }
    }
  } catch (error) {
    console.error('Error loading files:', error);
        showAlert('error', 'Error loading files: ' + error.message);
  }
}

// Helper Functions
async function uploadToIPFS(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
            body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
            throw new Error(`IPFS Upload Error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
        console.error('IPFS upload error:', error);
    throw error;
  }
}

async function downloadFile(fileHash) {
  try {
        showLoadingState('downloadButton', true);
        const response = await fetch(`https://ipfs.io/ipfs/${fileHash}`);
        
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
        a.download = fileHash;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
        
        showAlert('success', 'File downloaded successfully!');
  } catch (error) {
        console.error('Download error:', error);
        showAlert('error', 'Error downloading file: ' + error.message);
    } finally {
        showLoadingState('downloadButton', false);
    }
}

// Add this helper function for copying text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showAlert('success', 'Copied to clipboard!');
    } catch (err) {
        showAlert('error', 'Failed to copy text');
    }
}

// UI Helper Functions
function updateConnectedState() {
    const connectButton = document.getElementById('connectMetamask');
    connectButton.innerHTML = isConnected ? 
        `<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Logo" width="20" height="20" class="me-2">Connected` :
        `<img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Logo" width="20" height="20" class="me-2">Connect MetaMask`;
    connectButton.classList.toggle('btn-warning', !isConnected);
    connectButton.classList.toggle('btn-success', isConnected);
}

function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`;
    alertDiv.style.zIndex = '1050';
    alertDiv.setAttribute('data-aos', 'fade-down');
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi ${type === 'error' ? 'bi-exclamation-circle-fill' : 'bi-check-circle-fill'} icon-pulse me-2"></i>
            <div>${message}</div>
            <button type="button" class="btn-close ms-3" data-bs-dismiss="alert"></button>
        </div>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}

function showLoadingState(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    button.disabled = isLoading;
    const originalContent = button.getAttribute('data-original-content') || button.innerHTML;
    
    if (isLoading) {
        button.setAttribute('data-original-content', originalContent);
        button.innerHTML = `
            <div class="d-flex align-items-center justify-content-center">
                <div class="loading-spinner me-2"></div>
                <span class="loading-shimmer px-2">Processing...</span>
            </div>
        `;
        button.classList.add('loading-shimmer');
    } else {
        button.innerHTML = originalContent;
        button.classList.remove('loading-shimmer');
    }
}

function clearUploadForm() {
    document.getElementById('fileInput').value = '';
    document.getElementById('fileNameInput').value = '';
    document.getElementById('descriptionInput').value = '';
}

function clearShareForm() {
    document.getElementById('receiverAddress').value = '';
    document.getElementById('shareFileHash').value = '';
    document.getElementById('accessKey').value = '';
}

function clearAccessForm() {
    document.getElementById('senderAddress').value = '';
    document.getElementById('fileHashInput').value = '';
    document.getElementById('accessKeyInput').value = '';
}

function clearTables() {
    document.getElementById('fileListTable').innerHTML = '';
    document.getElementById('sharedAccessTable').innerHTML = '';
}

function showEmptyState() {
    document.getElementById('fileListTable').innerHTML = `
        <tr>
            <td colspan="6" class="text-center py-5">
                <div class="text-secondary" data-aos="fade-up">
                    <i class="bi bi-cloud-slash icon-pulse fs-1 mb-3 d-block"></i>
                    <p class="mb-0">No files uploaded yet</p>
                    <p class="text-muted small">Upload your first file to get started</p>
                    <button class="btn btn-outline-primary btn-hover-effect mt-3" onclick="document.getElementById('fileInput').click()">
                        <i class="bi bi-cloud-upload me-2"></i>Upload Now
                    </button>
                </div>
            </td>
        </tr>
    `;
    
    document.getElementById('sharedAccessTable').innerHTML = `
        <tr>
            <td colspan="4" class="text-center py-5">
                <div class="text-secondary" data-aos="fade-up">
                    <i class="bi bi-people-slash icon-pulse fs-1 mb-3 d-block"></i>
                    <p class="mb-0">No shared access yet</p>
                    <p class="text-muted small">Share your files with others to see them here</p>
                    <button class="btn btn-outline-primary btn-hover-effect mt-3" onclick="document.getElementById('shareButton').click()">
                        <i class="bi bi-share me-2"></i>Share Files
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function formatTimestamp(timestamp) {
    const date = new Date(Number(timestamp) * 1000);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // less than 1 minute
        return 'Just now';
    } else if (diff < 3600000) { // less than 1 hour
        const minutes = Math.floor(diff / 60000);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < 86400000) { // less than 1 day
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < 604800000) { // less than 1 week
        const days = Math.floor(diff / 86400000);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}

function addFileToTable(fileDetails, fileHash, grantedAt = null, isAccessedFile = false) {
    const downloadButton = `
        <button class="btn btn-sm btn-primary btn-hover-effect btn-ripple" onclick="downloadFile('${fileHash}')" id="downloadButton">
            <i class="bi bi-cloud-download me-1"></i>
            Download
        </button>
    `;

    const fileTypeLabel = isAccessedFile ? 
        '<span class="badge bg-info"><i class="bi bi-unlock-fill icon-pulse me-1"></i>Accessed</span>' : 
        '<span class="badge bg-primary"><i class="bi bi-person-check-fill icon-pulse me-1"></i>Owned</span>';

    const shortenedAddress = `${fileDetails.owner.substring(0, 6)}...${fileDetails.owner.substring(38)}`;
    const shortenedHash = `${fileHash.substring(0, 6)}...${fileHash.substring(fileHash.length - 4)}`;

    const row = document.createElement('tr');
    row.className = 'align-middle table-row-new';
    row.setAttribute('data-aos', 'fade-up');
    row.innerHTML = `
        <td>
            <span class="d-inline-block text-truncate hover-effect" style="max-width: 150px;" title="${fileDetails.owner}">
                ${shortenedAddress}
            </span>
        </td>
        <td>
            <div class="d-flex align-items-center gap-2">
                <span class="hover-effect">${fileDetails.fileName}</span>
                ${fileTypeLabel}
            </div>
        </td>
        <td>
            <span class="text-secondary hover-effect">${fileDetails.description}</span>
        </td>
        <td>
            <div class="d-flex align-items-center gap-2">
                <span class="d-inline-block text-truncate hover-effect" style="max-width: 150px;" title="${fileHash}">
                    ${shortenedHash}
                </span>
                <button class="btn btn-sm btn-outline-secondary btn-hover-effect btn-ripple" onclick="copyToClipboard('${fileHash}')" title="Copy full hash">
                    <i class="bi bi-clipboard"></i>
                </button>
            </div>
        </td>
        <td>${downloadButton}</td>
        <td>
            <span class="text-secondary hover-effect">
                ${grantedAt ? formatTimestamp(grantedAt) : formatTimestamp(fileDetails.timestamp)}
            </span>
        </td>
    `;
    document.getElementById('fileListTable').appendChild(row);
}

function addToSharedAccessTable(fileHash, address, accessDetails) {
    const shortenedAddress = `${address.substring(0, 6)}...${address.substring(38)}`;
    const shortenedHash = `${fileHash.substring(0, 6)}...${fileHash.substring(fileHash.length - 4)}`;
    const statusBadge = accessDetails.hasAccess ? 
        '<span class="badge bg-success hover-effect"><i class="bi bi-check-circle-fill icon-pulse me-1"></i>Active</span>' : 
        '<span class="badge bg-danger hover-effect"><i class="bi bi-x-circle-fill icon-pulse me-1"></i>Revoked</span>';

    const row = document.createElement('tr');
    row.className = 'align-middle table-row-new';
    row.setAttribute('data-aos', 'fade-up');
    row.innerHTML = `
        <td>
            <span class="d-inline-block text-truncate hover-effect" style="max-width: 150px;" title="${fileHash}">
                ${shortenedHash}
            </span>
        </td>
        <td>
            <span class="d-inline-block text-truncate hover-effect" style="max-width: 150px;" title="${address}">
                ${shortenedAddress}
            </span>
        </td>
        <td>
            <span class="text-secondary hover-effect">
                ${formatTimestamp(accessDetails.grantedAt)}
            </span>
        </td>
        <td>${statusBadge}</td>
    `;
    document.getElementById('sharedAccessTable').appendChild(row);
}

// Add this at the end of your existing JavaScript code

// Enhanced UI Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }

    .slide-in {
        animation: slideIn 0.3s ease-out forwards;
    }

    .pulse {
        animation: pulse 2s infinite;
    }

    .table tr {
        opacity: 0;
        animation: fadeIn 0.5s ease-out forwards;
    }

    .table tr:nth-child(1) { animation-delay: 0.1s; }
    .table tr:nth-child(2) { animation-delay: 0.2s; }
    .table tr:nth-child(3) { animation-delay: 0.3s; }
    .table tr:nth-child(4) { animation-delay: 0.4s; }
    .table tr:nth-child(5) { animation-delay: 0.5s; }

    .btn-loading {
        position: relative;
        pointer-events: none;
    }

    .btn-loading::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: inherit;
        border-radius: inherit;
        animation: pulse 1.5s infinite;
    }

    .hover-effect {
        transition: all 0.3s ease;
    }

    .hover-effect:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
    }

    .copy-button {
        opacity: 0.7;
        transition: all 0.2s ease;
    }

    .copy-button:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    .badge {
        transition: all 0.3s ease;
    }

    .badge:hover {
        transform: scale(1.1);
    }

    @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
    }

    @keyframes slideDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }

    .loading-shimmer {
        background: linear-gradient(90deg, 
            rgba(139, 92, 246, 0.1),
            rgba(139, 92, 246, 0.2),
            rgba(139, 92, 246, 0.1)
        );
        background-size: 1000px 100%;
        animation: shimmer 2s infinite linear;
    }

    .btn-ripple {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
    }

    .table-row-new {
        animation: slideDown 0.3s ease-out forwards;
    }

    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .btn-hover-effect:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
    }

    .icon-pulse {
        animation: iconPulse 1.5s ease infinite;
    }

    @keyframes iconPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
});