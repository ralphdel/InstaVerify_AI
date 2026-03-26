const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

async function run() {
  const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const geminiContent = [];
  
  // Dummy base64 image (1x1 pixel white jpeg)
  const dummyBase64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
  
  geminiContent.push({
    inlineData: {
      data: dummyBase64,
      mimeType: "image/jpeg"
    }
  });
  
  geminiContent.unshift("Please describe this image in one word.");
  
  try {
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: geminiContent,
    });
    console.log("SUCCESS:", response.text);
  } catch (err) {
    console.error("ERROR:", err.message || err);
  }
}

if (!process.env.GEMINI_API_KEY) {
  console.log("No GEMINI_API_KEY found in process.env");
} else {
  run();
}
