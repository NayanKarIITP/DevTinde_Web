import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import api from "../utils/api";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const res = await api.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      // Always fallback to an empty array
      const chatMessages = (res?.data?.chat?.messages  || []).map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName || "Unknown",
          lastName: senderId?.lastName || "",
          text,
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      setMessages([]); // fallback
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstName]);

  const sendMessage = () => {
    if (socketRef.current && newMessage.trim() !== "") {
      socketRef.current.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetUserId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[80vh] flex flex-col bg-base-200">
      <h1 className="p-5 border-b border-gray-400">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName
                  ? "chat-end"
                  : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.firstName + " " + msg.lastName}
                <time className="text-xs opacity-50">just now</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet</p>
        )}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 border-gray-500 input input-bordered w-full max-w-xs"
        />
        <button onClick={sendMessage} className="btn btn-secondary ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;




// import { useParams } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { createSocketConnection } from "../utils/socket";
// import { BASE_URL } from "../utils/constants";
// import { motion } from "framer-motion";

// // --- Helper Icon for the Send Button ---
// const SendIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//     </svg>
// );

// const Chat = () => {
//     const { targetUserId } = useParams();
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [targetUser, setTargetUser] = useState(null); // State for the person you're chatting with
//     const user = useSelector((store) => store.user);
//     const userId = user?._id;
//     const socketRef = useRef(null);
//     const messagesEndRef = useRef(null); // Ref for auto-scrolling

//     // --- Auto-scroll to the latest message ---
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     // --- Fetch initial chat history and target user info ---
//     useEffect(() => {
//         const fetchChatData = async () => {
//             try {
//                 // Fetch target user's profile for the header
//                 const userRes = await axios.get(`${BASE_URL}/profile/${targetUserId}`, { withCredentials: true });
//                 setTargetUser(userRes.data);

//                 // Fetch chat messages
//                 const chatRes = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
//                 const chatMessages = (chatRes?.data?.chat?.messages || []).map(msg => ({
//                     senderId: msg.senderId?._id,
//                     firstName: msg.senderId?.firstName || "Unknown",
//                     photoURL: msg.senderId?.photoURL,
//                     text: msg.text,
//                 }));
//                 setMessages(chatMessages);
//             } catch (error) {
//                 console.error("Error fetching chat data:", error);
//                 setMessages([]);
//             }
//         };

//         if (targetUserId) {
//             fetchChatData();
//         }
//     }, [targetUserId]);

//     // --- Setup WebSocket connection ---
//     useEffect(() => {
//         if (!userId || !user?.firstName) return;

//         const socket = createSocketConnection();
//         socketRef.current = socket;

//         socket.emit("joinChat", { userId, targetUserId });

//         socket.on("messageReceived", (newMessage) => {
//             setMessages(prevMessages => [...prevMessages, newMessage]);
//         });

//         return () => socket.disconnect();
//     }, [userId, targetUserId, user?.firstName]);


//     // --- Send a new message ---
//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (socketRef.current && newMessage.trim() !== "" && user) {
//             const messagePayload = {
//                 senderId: userId,
//                 firstName: user.firstName,
//                 photoURL: user.photoURL,
//                 targetUserId,
//                 text: newMessage,
//             };
//             socketRef.current.emit("sendMessage", messagePayload);
//             setMessages(prev => [...prev, messagePayload]); // Optimistic update
//             setNewMessage("");
//         }
//     };
    
//     if (!targetUser) {
//         return <div className="flex justify-center items-center h-screen bg-gray-900"><span className="loading loading-dots loading-lg"></span></div>;
//     }

//     return (
//         <div className="h-[calc(100vh-120px)] flex flex-col bg-base-300">
//             {/* --- Chat Header --- */}
//             <header className="flex items-center p-4 bg-base-100 shadow-md z-10">
//                 <div className="avatar mr-4">
//                     <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                         <img src={targetUser.photoURL || `https://ui-avatars.com/api/?name=${targetUser.firstName}`} alt="Avatar" />
//                     </div>
//                 </div>
//                 <h1 className="text-xl font-bold">{targetUser.firstName} {targetUser.lastName}</h1>
//             </header>

//             {/* --- Messages Area --- */}
//             <main className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg, index) => (
//                     <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className={`chat ${userId === msg.senderId ? "chat-end" : "chat-start"}`}
//                     >
//                         <div className="chat-image avatar">
//                             <div className="w-10 rounded-full">
//                                 <img alt="User Avatar" src={msg.photoURL || `https://ui-avatars.com/api/?name=${msg.firstName}`} />
//                             </div>
//                         </div>
//                         <div className="chat-header text-xs opacity-70 mb-1">{msg.firstName}</div>
//                         <div className={`chat-bubble ${userId === msg.senderId ? "chat-bubble-primary" : ""}`}>
//                             {msg.text}
//                         </div>
//                     </motion.div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </main>

//             {/* --- Message Input Form --- */}
//             <footer className="p-4 bg-base-100 border-t border-base-300">
//                 <form onSubmit={handleSendMessage} className="flex items-center gap-4">
//                     <input
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         type="text"
//                         placeholder="Type a message..."
//                         className="input input-bordered w-full"
//                     />
//                     <button type="submit" className="btn btn-primary btn-circle">
//                         <SendIcon />
//                     </button>
//                 </form>
//             </footer>
//         </div>
//     );
// };

// export default Chat;

