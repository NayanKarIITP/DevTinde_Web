
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
      const res = await api.get("/chat/" + targetUserId, {
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

  // Chat.jsx (Upgraded Section inside return statement)
  return (
    <div className="max-w-4xl mx-auto w-full border border-base-300 shadow-2xl rounded-3xl my-8 h-[75vh] flex flex-col bg-base-100 overflow-hidden">
      <div className="p-5 border-b border-base-300 bg-base-200/50 backdrop-blur-sm">
        <h1 className="text-xl font-bold tracking-wide">Chat</h1>
      </div>
      
      <div className="flex-1 overflow-y-scroll p-6 bg-base-100/50">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isMe = user.firstName === msg.firstName;
            return (
              <div key={index} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                <div className="chat-header mb-1 text-xs opacity-70 font-medium">
                  {msg.firstName + " " + msg.lastName}
                </div>
                <div className={`chat-bubble shadow-sm ${isMe ? "chat-bubble-primary text-primary-content" : "bg-base-300 text-base-content"}`}>
                  {msg.text}
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex h-full items-center justify-center text-base-content/40 font-medium">
            No messages yet. Say hello! 👋
          </div>
        )}
      </div>

      <div className="p-4 border-t border-base-300 bg-base-200/30 flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          type="text"
          placeholder="Type a message..."
          className="flex-1 input input-bordered input-primary rounded-full bg-base-100 shadow-inner focus:outline-none"
        />
        <button onClick={sendMessage} className="btn btn-primary btn-circle shadow-lg hover:scale-105 transition-transform">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1"><path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;

