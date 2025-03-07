// import React, { useState, useEffect, useRef } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const VoiceInput = () => {
//   const { transcript, resetTranscript, listening } = useSpeechRecognition();
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [conversationLog, setConversationLog] = useState([]); // ✅ Store user & AI messages

//   useEffect(() => {
//     console.log("🟢 Requesting initial welcome message from Rasa...");
//     fetchWelcomeMessage(); // ✅ Get the welcome message
//   }, []);

//   useEffect(() => {
//     if (!isSpeaking && transcript.trim() !== "") {
//       console.log("🟢 User spoke:", transcript);
//       setConversationLog((prevLog) => [
//         ...prevLog,
//         { sender: "user", message: transcript.trim() },
//       ]); // ✅ Save user message
//       sendMessageToRasa(transcript.trim());
//       resetTranscript(); // ✅ Clear transcript after sending
//     }
//   }, [transcript]);

//   // ✅ Fetch Initial Welcome Message
//   const fetchWelcomeMessage = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: "greet" }),
//       });

//       const data = await response.json();
//       console.log("🟢 Initial response from backend:", data);

//       if (data && data.message) {
//         console.log("🔊 AI Speaking:", data.message);
//         setConversationLog((prevLog) => [
//           ...prevLog,
//           { sender: "AI", message: data.message },
//         ]); // ✅ Save AI message
//         speak(data.message);
//       }
//     } catch (error) {
//       console.error("🔴 Error fetching welcome message:", error);
//     }
//   };

//   // ✅ Send User Speech to Rasa
//   const sendMessageToRasa = async (message) => {
//     try {
//       console.log("🟢 Sending user message to Rasa:", message);

//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       const data = await response.json();
//       console.log("🟢 Rasa Response:", data);

//       if (data && data.message) {
//         console.log("🔊 AI Speaking:", data.message);
//         setConversationLog((prevLog) => [
//           ...prevLog,
//           { sender: "AI", message: data.message },
//         ]); // ✅ Save AI message
//         speak(data.message);
//       } else {
//         console.error("🔴 No response message received from backend.");
//       }
//     } catch (error) {
//       console.error("🔴 Error sending message to Rasa:", error);
//     }
//   };

//   // ✅ AI Speech Function
//   const speak = (text) => {
//     console.log("🔊 AI Speaking:", text);
//     const speech = new SpeechSynthesisUtterance(text);
//     speech.lang = "en-US";
//     speech.rate = 1;
//     speech.onstart = () => setIsSpeaking(true);
//     speech.onend = () => {
//       setIsSpeaking(false);
//       console.log("🎤 AI finished speaking, resuming listening...");
//       SpeechRecognition.startListening({ continuous: true, language: "en-US" }); // ✅ Restart listening
//     };

//     window.speechSynthesis.speak(speech);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">🎙️ AI Voice Assistant</h2>
//       <p>
//         🗣 You said: <strong>{transcript}</strong>
//       </p>
//       <p>{isSpeaking ? "🔊 AI is speaking..." : "🎤 Listening..."}</p>

//       <h3 className="mt-4 text-lg font-bold">📜 Conversation Log</h3>
//       <ul className="bg-gray-100 p-2 rounded">
//         {conversationLog.map((entry, index) => (
//           <li
//             key={index}
//             className={
//               entry.sender === "user" ? "text-blue-500" : "text-green-500"
//             }
//           >
//             {entry.sender === "user" ? "👤 You: " : "🤖 AI: "}
//             {entry.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VoiceInput;

// import React, { useState, useEffect } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const VoiceInput = () => {
//   const { transcript, resetTranscript, listening } = useSpeechRecognition();
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [responseText, setResponseText] = useState(""); // ✅ Store AI response
//   const [conversationLog, setConversationLog] = useState([]);

//   useEffect(() => {
//     fetchWelcomeMessage(); // Fetch AI welcome message when component mounts
//   }, []);

//   useEffect(() => {
//     if (!isSpeaking && transcript.trim() !== "") {
//       setConversationLog((prevLog) => [
//         ...prevLog,
//         { sender: "user", message: transcript.trim() },
//       ]);
//       sendMessageToRasa(transcript.trim());
//       resetTranscript();
//     }
//   }, [transcript]);

//   // ✅ Fetch Welcome Message from Rasa
//   const fetchWelcomeMessage = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: "greet" }),
//       });

//       const data = await response.json();
//       if (data && data.message) {
//         setResponseText(data.message);
//         setConversationLog((prevLog) => [
//           ...prevLog,
//           { sender: "AI", message: data.message },
//         ]);
//         speak(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching welcome message:", error);
//     }
//   };

//   // ✅ Send User Input to Rasa
//   const sendMessageToRasa = async (message) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       const data = await response.json();
//       if (data && data.message) {
//         setResponseText(data.message);
//         setConversationLog((prevLog) => [
//           ...prevLog,
//           { sender: "AI", message: data.message },
//         ]);
//         speak(data.message);
//       }
//     } catch (error) {
//       console.error("Error sending message to Rasa:", error);
//     }
//   };

//   // ✅ AI Speech Function
//   const speak = (text) => {
//     const speech = new SpeechSynthesisUtterance(text);
//     speech.lang = "en-US";
//     speech.rate = 1;
//     speech.onstart = () => setIsSpeaking(true);
//     speech.onend = () => {
//       setIsSpeaking(false);
//       SpeechRecognition.startListening({ continuous: true, language: "en-US" });
//     };
//     window.speechSynthesis.speak(speech);
//   };

//   return (
//     <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80">
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
//           <span className="text-gray-400">You said: </span>
//           <span className="font-semibold">{transcript || "..."}</span>
//         </p>
//         <p className="mt-2 text-lg">
//           <span className="text-gray-400">AI Response: </span>
//           <span className="font-semibold">{responseText || "..."}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VoiceInput;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceInput = () => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [conversationLog, setConversationLog] = useState([]);
  const navigate = useNavigate(); // ✅ React Router Navigation

  useEffect(() => {
    fetchWelcomeMessage(); // ✅ Fetch AI greeting on startup
  }, []);

  // ✅ Don't send empty messages at start
  useEffect(() => {
    if (
      !isSpeaking &&
      transcript.trim() !== "" &&
      !transcript.includes("Navigating to")
    ) {
      setConversationLog((prevLog) => [
        ...prevLog,
        { sender: "user", message: transcript.trim() },
      ]);
      sendMessageToRasa(transcript.trim());
      resetTranscript();
    }
  }, [transcript]);

  const fetchWelcomeMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "greet" }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      handleRasaResponse(data.message);
    } catch (error) {
      console.error("🔴 Error fetching welcome message:", error);
    }
  };

  const sendMessageToRasa = async (message) => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      handleRasaResponse(data.message);
    } catch (error) {
      console.error("🔴 Error sending message to Rasa:", error);
    }
  };

  // ✅ Handle AI Response & Navigation
  const handleRasaResponse = (message) => {
    setResponseText(message);
    setConversationLog((prevLog) => [...prevLog, { sender: "AI", message }]);
    speak(message);

    // ✅ Prevent immediate navigation on startup
    if (
      message.toLowerCase().includes("navigating to") &&
      transcript.trim() !== ""
    ) {
      const route = extractRouteFromMessage(message);
      console.log("🔵 Navigating to:", route);
      navigate(route);
    }
  };

  // ✅ Extract Path from Rasa Message
  const extractRouteFromMessage = (message) => {
    const regex = /\/[a-zA-Z0-9-_/]+/; // Find "/clothing", "/electronics", etc.
    const match = message.match(regex);
    return match ? match[0] : "/"; // Default to home if no route found
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.85; // ✅ Slower speed for natural tone
    speech.pitch = 1;
    speech.volume = 1;

    // ✅ Pause listening while AI speaks
    SpeechRecognition.stopListening();

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);

      // ✅ Add a slight delay before restarting listening
      setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });
      }, 1000);
    };

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-bold">🎙️ AI Assistant</h2>
      <p>{listening ? "Listening..." : "Click to start listening"}</p>
      <p className="text-sm text-gray-400">
        Try saying: "Hey Assistant, navigate to men clothing"
      </p>
      <div className="mt-4">
        <p className="text-lg">
          <span className="text-gray-400">You said: </span>
          {transcript || "..."}
        </p>
        <p className="mt-2 text-lg">
          <span className="text-gray-400">AI Response: </span>
          {responseText || "..."}
        </p>
      </div>
    </div>
  );
};

export default VoiceInput;
