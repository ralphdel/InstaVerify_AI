import { GoogleGenAI } from '@google/genai';

async function run() {
  if (!process.env.GEMINI_API_KEY) {
    console.log("No key found, skipping test.");
    return;
  }
  const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const geminiContent = [];
  
  // Dummy base64 jpeg (1x1 pixel)
  const dummyBase64 = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";
  
  geminiContent.push({
    inlineData: {
      data: dummyBase64,
      mimeType: "image/jpeg"
    }
  });

  geminiContent.push({
    inlineData: {
      data: dummyBase64,
      mimeType: "image/jpeg"
    }
  });
  
  geminiContent.unshift("Please describe these two images. Test prompt.");
  
  console.log("Testing dual document upload structure...");
  try {
    console.log("Calling Gemini...");
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: geminiContent,
    });
    console.log("SUCCESS");
    console.log(response.text);
  } catch (err) {
    console.error("ERROR from Gemini:");
    console.error(err?.message || err);
  }
}

run();
