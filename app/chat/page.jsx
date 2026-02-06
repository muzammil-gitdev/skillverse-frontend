"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GigsNavbar from "@/components/GigsNavbar";
import Image from "next/image";

function ChatContent() {
    const searchParams = useSearchParams();
    const sellerName = searchParams.get('sellerName');
    const sellerAvatar = searchParams.get('sellerAvatar') || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { sender: "them", text: "Hi there! How can I help you today?", time: "10:00 AM" }
    ]);

    // Mock recent contacts
    const contacts = [
        { id: 1, name: sellerName || "John Doe", avatar: sellerAvatar, lastMessage: "Hi there! How can I help you...", time: "10:00 AM", active: true },
        { id: 2, name: "Alice Smith", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", lastMessage: "Thanks for the order!", time: "Yesterday", active: false },
        { id: 3, name: "Robert Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", lastMessage: "Can you send the files?", time: "2 days ago", active: false },
    ];

    useEffect(() => {
        if (sellerName) {
            // In a real app, we'd fetch the specific chat history here
            setChatHistory([
                { sender: "them", text: `Hi! thanks for checking out my gig. I'm ${sellerName}, how can I help directly?`, time: "Just now" }
            ]);
        }
    }, [sellerName]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setChatHistory([...chatHistory, { sender: "me", text: message, time: "Just now" }]);
        setMessage("");

        // Simulate reply
        setTimeout(() => {
            setChatHistory(prev => [...prev, { sender: "them", text: "Thanks for your message! I'll get back to you shortly.", time: "Just now" }]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <GigsNavbar />
            <div className="flex flex-1 pt-24 pb-4 px-4 container-main gap-6 overflow-hidden">

                {/* Sidebar - Contacts List */}
                <div className="w-80 hidden md:flex flex-col border-r border-gray-100 pr-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1dbf73]/50"
                            />
                            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2">
                        {contacts.map(contact => (
                            <div
                                key={contact.id}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${contact.active ? 'bg-[#1dbf73]/5 border border-[#1dbf73]/20' : 'hover:bg-gray-50'}`}
                            >
                                <div className="relative">
                                    <Image src={contact.avatar} alt={contact.name} width={48} height={48} className="rounded-full object-cover" />
                                    {contact.active && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className={`font-semibold text-sm truncate ${contact.active ? 'text-gray-900' : 'text-gray-700'}`}>{contact.name}</h4>
                                        <span className="text-xs text-gray-400">{contact.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${contact.active ? 'text-[#1dbf73]' : 'text-gray-500'}`}>{contact.lastMessage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    {/* Chat Header */}
                    <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image
                                src={sellerAvatar || contacts[0].avatar}
                                alt={sellerName || "Chat"}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-gray-900">{sellerName || "John Doe"}</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-500">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                            <button className="hover:text-gray-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></button>
                            <button className="hover:text-gray-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                            <button className="hover:text-gray-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        <div className="text-center text-xs text-gray-400 my-4">Today</div>
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] rounded-2xl px-5 py-3 text-sm ${msg.sender === 'me'
                                        ? 'bg-[#1dbf73] text-white rounded-br-none'
                                        : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none shadow-sm'
                                    }`}>
                                    <p>{msg.text}</p>
                                    <div className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-green-100' : 'text-gray-400'}`}>
                                        {msg.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleSend} className="flex items-center gap-3">
                            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </button>
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
                                <svg className="w-5 h-5 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ChatContent />
        </Suspense>
    );
}
