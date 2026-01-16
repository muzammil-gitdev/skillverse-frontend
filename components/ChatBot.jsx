"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 How can I help you today?", isBot: true },
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: inputValue, isBot: false };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");

        // Simulate bot response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                text: "Thanks for your message! Our team will get back to you shortly.",
                isBot: true,
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none ${isOpen ? "bg-red-500 rotate-90" : "bg-[#1dbf73]"
                    } text-white`}
            >
                {isOpen ? (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-full max-w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-10 pointer-events-none"
                    }`}
            >
                {/* Header */}
                <div className="bg-[#1dbf73] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">SkillVerse Bot</h3>
                            <p className="text-green-100 text-xs flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-[350px] overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot
                                        ? "bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-sm"
                                        : "bg-[#1dbf73] text-white rounded-tr-none shadow-md"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#1dbf73] focus:bg-white transition-all outline-none"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="p-2 bg-[#1dbf73] text-white rounded-full hover:bg-[#19a463] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
