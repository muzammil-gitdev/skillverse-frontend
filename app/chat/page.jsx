"use client";
import React, { useState, useEffect, Suspense, useContext } from "react";
import { useSearchParams } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";
import { AccountContext } from "../context/accountProvider";
import { socket } from "../services/socket";
import {
  setConversation,
  getConversation,
  newMessage,
  getMessage,
  getAllConversation,
  getConversationDetails,
} from "../services/chatapi";

function ChatContent() {
  const { user_id, onlineUsers, setOnlineUsers } = useContext(AccountContext);
  const senderId = user_id;

  const searchParams = useSearchParams();
  const receiverIdFromParams = searchParams.get("receiverId");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  // State to store user info
  const [usersInfo, setUsersInfo] = useState({});
  useEffect(() => {
    socket.on("getMessage", (data) => {
      // 1. Update main chat if it's the active window
      if (data.conversationId === activeConversationId) {
        setMessages((prev) => [...prev, data]);
      }

      // 2. Update the sidebar "last message" for that conversation
      setConversations((prevConvos) =>
        prevConvos.map((convo) =>
          convo._id === data.conversationId
            ? { ...convo, message: data.text, updatedAt: data.createdAt }
            : convo,
        ),
      );
    });

    return () => socket.off("getMessage");
  }, [activeConversationId]);

  /* ===============================
     LOAD ALL CONVERSATIONS
  =============================== */
  useEffect(() => {
    const fetchConversations = async () => {
      if (!senderId) return;
      const data = await getAllConversation(senderId);
      setConversations(data || []);
    };

    fetchConversations();
  }, [senderId]);

  const scrollRef = React.useRef();

  useEffect(() => {
    // Scrolls to bottom whenever messages change
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     FETCH USER DETAILS
  =============================== */
  useEffect(() => {
    const fetchAllUserDetails = async () => {
      // Find all unique "other" user IDs
      const otherUserIds = conversations
        .map((convo) => convo.members?.find((m) => m !== senderId))
        .filter((id) => id && !usersInfo[id]);

      if (otherUserIds.length === 0) return;

      const infoUpdates = { ...usersInfo };

      for (const id of otherUserIds) {
        try {
          const response = await getConversationDetails(id);
          // BACKEND FIX: Since your backend returns { success: true, data: user }
          // We check if response has 'data' property.
          const userData = response?.data || response;
          infoUpdates[id] = userData;
        } catch (err) {
          console.error("Error fetching details for user:", id, err);
        }
      }
      setUsersInfo(infoUpdates);
    };

    if (conversations.length > 0) fetchAllUserDetails();
  }, [conversations, senderId]);

  /* ===============================
     CREATE / GET CONVERSATION FROM PARAM
  =============================== */
  useEffect(() => {
    if (!receiverIdFromParams || !senderId) return;

    const setupConversation = async () => {
      await setConversation({
        senderId,
        receiverId: receiverIdFromParams,
      });

      const convo = await getConversation({
        senderId,
        receiverId: receiverIdFromParams,
      });

      if (convo?._id) {
        setActiveConversationId(convo._id);
      }
    };

    setupConversation();
  }, [receiverIdFromParams, senderId]);

  /* ===============================
     LOAD MESSAGES WHEN CONVO CHANGES
  =============================== */
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeConversationId) return;
      const msgs = await getMessage(activeConversationId);
      setMessages(msgs || []);
    };

    fetchMessages();
  }, [activeConversationId]);

  /* ===============================
     SEND MESSAGE
  =============================== */
  /* ===============================
   SEND MESSAGE
=============================== */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeConversationId) return;

    const activeConversation = conversations.find(
      (c) => c._id === activeConversationId,
    );

    const receiverId =
      activeConversation?.members?.find((m) => m !== senderId) ||
      receiverIdFromParams;

    const data = {
      senderId,
      receiverId,
      conversationId: activeConversationId,
      type: "text",
      text: message,
      createdAt: new Date().toISOString(), // Add timestamp for immediate UI update
    };

    // 1. Emit to Socket for Real-time delivery
    socket.emit("sendMessage", data);

    // 2. Save to Database
    await newMessage(data);

    // 3. Optimistic UI Update: Add the message to your own state immediately
    setMessages((prev) => [...prev, data]);

    setMessage("");
  };

  const activeConversation = conversations.find(
    (c) => c._id === activeConversationId,
  );

  const activeReceiverId =
    activeConversation?.members?.find((m) => m !== senderId) ||
    receiverIdFromParams;

  const activeUser = usersInfo[activeReceiverId] || {};

  return (
    <div className="flex flex-col h-screen bg-white">
      <GigsNavbar />
      <div className="flex flex-1 pt-24 pb-4 px-4 container-main gap-6 overflow-hidden w-7/12">
        {/* Sidebar - Contacts List */}
        <div className="w-80 hidden md:flex flex-col border-r border-gray-100 pr-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {conversations.map((conversation) => {
              // 1. Move the check inside the return or handle the skip
              if (!conversation.message) return null;

              const otherUserId = conversation.members?.find(
                (m) => m !== senderId,
              );
              const user = usersInfo[otherUserId] || {};

              return (
                <div
                  // 2. Ensure the KEY is on this outermost DIV
                  key={conversation._id}
                  onClick={() => setActiveConversationId(conversation._id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    activeConversationId === conversation._id
                      ? "bg-[#1dbf73]/5 border border-[#1dbf73]/20"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    <img
                      src={
                        user.profilePic ||
                        "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1772314700/avatar_nzve1u.png"
                      }
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-sm truncate text-gray-900">
                        {user.fullName || "Loading..."}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {new Date(conversation.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs truncate text-gray-500">
                      {conversation.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={
                    activeUser.profilePic ||
                    "https://res.cloudinary.com/dkr5ewnfu/image/upload/v1772314700/avatar_nzve1u.png"
                  }
                  className="w-full h-full object-cover"
                />

                {onlineUsers.some((u) => u.id === activeReceiverId) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {activeUser.fullName || "Loading..."}
                </h3>
                <div className="flex items-center gap-1.5">
                  {onlineUsers.some((user) => user.id === activeReceiverId) ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Online</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">Offline</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-center text-xs text-gray-400 my-4">Today</div>

            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.senderId === senderId ? "justify-end" : "justify-start"
                }`}
              >
                <div ref={scrollRef} />
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-3 text-sm ${
                    msg.senderId === senderId
                      ? "bg-[#1dbf73] text-white rounded-br-none"
                      : "bg-white border border-gray-100 text-gray-700 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      msg.senderId === senderId
                        ? "text-green-100"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1dbf73] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 bg-[#1dbf73] rounded-full flex items-center justify-center text-white hover:bg-[#19a463] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
