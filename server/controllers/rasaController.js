// const axios = require("axios");

// async function sendMessageToRasa(message) {
//   try {
//     console.log("🟢 Sending message to Rasa:", message);

//     const response = await axios.post(
//       "http://localhost:5005/webhooks/rest/webhook",
//       { sender: "user", message: message }
//     );

//     console.log("🟢 Received response from Rasa:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("🔴 Error sending message to Rasa:", error.message);
//     return null;
//   }
// }

// module.exports = { sendMessageToRasa };

const axios = require("axios");

async function sendMessageToRasa(message) {
  try {
    console.log("🟢 Sending message to Rasa:", message);

    const response = await axios.post(
      "http://127.0.0.1:5005/webhooks/rest/webhook",
      { sender: "user", message: message }
    );

    console.log("🟢 Received response from Rasa:", response.data);

    // If empty response, handle it
    if (!response.data || response.data.length === 0) {
      throw new Error("No response from Rasa.");
    }

    return response.data;
  } catch (error) {
    console.error("🔴 Error sending message to Rasa:", error.message);
    return [{ text: "I'm sorry, I couldn't process that request." }];
  }
}

module.exports = { sendMessageToRasa };
