const express = require("express");
const router = express.Router();
const { sendMessageToRasa } = require("../controllers/rasaController");

router.post("/chat", async (req, res) => {
  const message = req.body.message;
  console.log("Received message from frontend:", message);

  if (!message) {
    console.error("Error: No message received from frontend.");
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const rasaResponse = await sendMessageToRasa(message);
    console.log("Response from Rasa:", rasaResponse);

    if (rasaResponse && rasaResponse.length > 0 && rasaResponse[0].text) {
      return res.json({ message: rasaResponse[0].text });
    }

    console.error("Rasa did not return a valid response");
    res.status(500).json({ error: "No response from Rasa" });
  } catch (error) {
    console.error("Error handling chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
