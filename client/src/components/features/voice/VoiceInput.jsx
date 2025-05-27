import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceInput = () => {
  const { transcript, resetTranscript, listening, interimTranscript } =
    useSpeechRecognition();

  const [debouncedTranscript, setDebouncedTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [conversationLog, setConversationLog] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      console.error("Browser does not support speech recognition.");
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (
        !interimTranscript &&
        transcript.trim() !== "" &&
        transcript.trim() !== debouncedTranscript
      ) {
        setDebouncedTranscript(transcript.trim());
        sendMessageToRasa(transcript.trim());
        resetTranscript();
      }
    }, 1200);

    return () => clearTimeout(handler);
  }, [transcript, interimTranscript]);

  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  const fetchWelcomeMessage = async () => {
    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "greet" }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      handleRasaResponse(data);
    } catch (error) {
      console.error("🔴 Error fetching welcome message:", error);
      setIsError(true);
    }
  };

  const sendMessageToRasa = async (message) => {
    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      handleRasaResponse(data);
    } catch (error) {
      console.error("🔴 Error sending message to Rasa:", error);
      setIsError(true);
    }
  };

  const handleRasaResponse = (data) => {
    const message = data.message || "I'm not sure how to respond to that.";
    setResponseText(message);
    setConversationLog((prevLog) => [...prevLog, { sender: "AI", message }]);
    speak(message);

    if (
      message.toLowerCase().includes("navigating to") &&
      transcript.trim() !== ""
    ) {
      const route = extractRouteFromMessage(message);
      console.log("🔵 Navigating to:", route);
      navigate(route);
    }
  };

  const extractRouteFromMessage = (message) => {
    const regex = /\/[a-zA-Z0-9\-_/]+/g;
    const matches = message.match(regex);
    if (!matches) return "/";

    const cleanPath = matches[0].replace(/[.,!?]$/, "");
    return cleanPath;
  };

  const speak = (text) => {
    const cleanedText = text.replace(/\//g, " ");

    const speech = new SpeechSynthesisUtterance(cleanedText);
    speech.lang = "en-US";
    speech.rate = 0.85;
    speech.pitch = 1;
    speech.volume = 1;

    SpeechRecognition.stopListening();

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });
      }, 1000);
    };

    window.speechSynthesis.speak(speech);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const renderErrorMessage = () => {
    if (isError) {
      return (
        <p className="text-red-500 mt-2">
          Sorry, something went wrong. Please try again.
        </p>
      );
    }
    return null;
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="p-4">❌ Your browser does not support voice input.</div>
    );
  }

  return (
    <div
      className={`fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 transition-all duration-300 ${
        isMinimized ? "h-16 w-16" : "w-80"
      } z-50`}
    >
      <button
        onClick={toggleMinimize}
        className="absolute top-0 right-0 text-white text-lg font-bold bg-gray-700 rounded-full p-2"
      >
        {isMinimized ? "➕" : "➖"}
      </button>

      {!isMinimized && (
        <div>
          <h2 className="text-lg font-bold">🎙️ AI Assistant</h2>
          <p>{listening ? "Listening..." : "Not listening. Click below 👇"}</p>
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

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-US",
              })
            }
          >
            🔁 Start Listening
          </button>

          {renderErrorMessage()}
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
