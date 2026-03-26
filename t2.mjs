import fs from 'fs';

async function testUpload() {
  const dummyBase64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
  const binaryString = atob(dummyBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: 'image/jpeg' });
  
  const formData = new FormData();
  formData.append('cacFile', blob, 'cac.jpg');
  formData.append('utilityFile', blob, 'util.jpg');
  formData.append('merchantName', 'Test Merchant');
  formData.append('merchantAddress', 'Test Address');
  
  console.log("Sending request to localhost:3000...");
  try {
    const res = await fetch('http://localhost:3000/api/verify-document', {
      method: 'POST',
      body: formData
    });
    console.log("HTTP STATUS:", res.status);
    const text = await res.text();
    console.log("BODY:", text.substring(0, 500));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testUpload();
