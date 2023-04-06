import axios from "axios";

const PINATA_API_BASE_URL = "https://api.pinata.cloud/pinning";
const PINATA_API_KEY = "REACT_APP_PINATA_API_KEY";
const PINATA_API_SECRET_KEY = "REACT_APP_PINATA_SECRET_KEY";

async function uploadFileToPinata(file, metadata = {}) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify(metadata));
  const response = await axios.post(
    `${PINATA_API_BASE_URL}/pinFileToIPFS`,
    formData,
    {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET_KEY,
      },
    }
  );
  return response.data.IpfsHash;
}

function fetchImageFromPinata(ipfsHash) {
  return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
}

export { uploadFileToPinata, fetchImageFromPinata };
