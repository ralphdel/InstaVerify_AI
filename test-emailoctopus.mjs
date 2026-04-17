import { config } from 'dotenv';
config({ path: '.env.local' });

const eoApiKey = process.env.EMAILOCTOPUS_API_KEY;
const eoListId = process.env.EMAILOCTOPUS_LIST_ID;

if (!eoApiKey || !eoListId) {
  console.error("Missing API key or List ID");
  process.exit(1);
}

const eoUrl = `https://emailoctopus.com/api/1.6/lists/${eoListId}/contacts`;

async function testEmailOctopus() {
  console.log(`Sending to list: ${eoListId}`);
  try {
    const eoResponse = await fetch(eoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: eoApiKey,
        email_address: "test_integration_" + Date.now() + "@example.com",
        fields: {
          FirstName: "Test",
          LastName: "User",
          Company: "Test Corp",
          Role: "Tester",
        },
        status: 'SUBSCRIBED',
      }),
    });

    const status = eoResponse.status;
    const text = await eoResponse.text();
    console.log(`Status: ${status}`);
    console.log(`Response: ${text}`);
  } catch (err) {
    console.error("Exception:", err);
  }
}

testEmailOctopus();
