// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ChatbotComponent = () => {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! How can I assist you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Listen for navigation responses from Rasa
//     window.addEventListener("message", (event) => {
//       if (
//         event.data &&
//         event.data.metadata &&
//         event.data.metadata.navigate_to
//       ) {
//         navigate(event.data.metadata.navigate_to); // ✅ Redirects user to the correct page
//       }
//     });

//     return () => {
//       window.removeEventListener("message", () => {});
//     };
//   }, [navigate]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]); // ✅ Show user message in chat

//     try {
//       const response = await axios.post(
//         "http://localhost:5005/webhooks/rest/webhook",
//         {
//           sender: "user",
//           message: input,
//         }
//       );

//       if (response.data.length > 0) {
//         const botMessage = response.data[0].text;
//         setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);

//         // Handle navigation event
//         if (
//           response.data[0].metadata &&
//           response.data[0].metadata.navigate_to
//         ) {
//           navigate(response.data[0].metadata.navigate_to);
//         }
//       }
//     } catch (error) {
//       console.error("Error sending message to Rasa:", error);
//     }

//     setInput(""); // ✅ Clear input field
//   };

//   return (
//     <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg border border-gray-300">
//       <div className="h-64 overflow-y-auto p-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 my-2 ${
//               msg.sender === "user" ? "text-right" : "text-left"
//             }`}
//           >
//             <span
//               className={`px-4 py-2 rounded-lg ${
//                 msg.sender === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="p-2 border-t flex">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 px-3 py-2 rounded-l-lg border"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatbotComponent;
