// import React, { useState, useEffect } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import axios from "axios";

// const VoiceAssistant = () => {
//   const [responseText, setResponseText] = useState("");
//   const { transcript, listening, resetTranscript } = useSpeechRecognition();

//   useEffect(() => {
//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//       alert("Your browser does not support voice recognition.");
//       return;
//     }
//     SpeechRecognition.startListening({ continuous: true, language: "en-US" }); // ✅ Always Listening
//   }, []);

//   useEffect(() => {
//     if (transcript.toLowerCase().includes("hey assistant")) {
//       const command = transcript.replace("hey assistant", "").trim();
//       if (command.length > 0) {
//         console.log("🔹 User Spoke:", command); // ✅ Debug User Speech
//         sendToRasa(command); // ✅ Send to Rasa
//         resetTranscript(); // ✅ Clear transcript after sending
//       }
//     }
//   }, [transcript]);

//   const sendToRasa = async (text) => {
//     try {
//       console.log("🔹 Sending message to Rasa:", text);
//       const response = await axios.post(
//         "http://localhost:5005/webhooks/rest/webhook",
//         { sender: "user", message: text }
//       );

//       console.log("🔹 Rasa Response:", response.data);

//       if (response.data.length > 0) {
//         const botMessage = response.data[0].text;
//         setResponseText(botMessage); // ✅ Store response in UI
//         speak(botMessage); // ✅ Speak out the response
//       }
//     } catch (error) {
//       console.error("❌ Error communicating with Rasa:", error);
//     }
//   };

//   const speak = (text) => {
//     const speech = new SpeechSynthesisUtterance();
//     speech.text = text;
//     speech.volume = 1;
//     speech.rate = 1;
//     speech.pitch = 1;
//     window.speechSynthesis.speak(speech);
//   };

//   return (
//     <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
//       <h2 className="text-lg font-bold">🎙️ Hands-Free AI Assistant</h2>
//       <p className="mt-2">
//         {listening
//           ? "Listening... Say 'Hey Assistant'"
//           : "Click the button to start listening"}
//       </p>
//       <p className="mt-2 text-sm text-gray-400">
//         Try saying: "Hey Assistant, navigate to men clothing"
//       </p>

//       <div className="mt-4">
//         <p className="text-lg">
//           You said: <span className="font-semibold">{transcript}</span>
//         </p>
//         <p className="mt-2 text-lg">
//           AI Response: <span className="font-semibold">{responseText}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VoiceAssistant;
