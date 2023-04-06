// Create a function to handle the "Connect" button click
export async function connectMetamask() {
    // Check if Metamask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request permission to connect to the user's Metamask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Metamask successfully connected');
        // TODO: perform actions that require a connected wallet, such as reading user account information
      } catch (error) {
        console.error(error);
        alert('Failed to connect to Metamask');
      }
    } else {
      alert('Please install Metamask to connect your wallet');
    }
  }
  
  // Attach the connectMetamask function to a "Connect" button
  // const connectButton = document.getElementById('connect-button');
  // connectButton.addEventListener('click', connectMetamask);