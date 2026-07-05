import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { cn } from "../lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import {
  MOCK_EMPLOYEES,
  MOCK_ANNOUNCEMENTS,
  MOCK_LEAVE_REQUESTS,
  MOCK_ATTENDANCE_RECORDS,
} from "../lib/mockData";

interface Message {
  role: "user" | "bot";
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi there! I am your FlowDesk Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "API Key not found. Please add VITE_GEMINI_API_KEY to your .env file.",
          },
        ]);
        return;
      }

      const systemPrompt = `You are FlowDesk Assistant, a highly capable AI for the FlowDesk Employee Dashboard. 
Answer questions using this exact data:
- Employees: ${JSON.stringify(MOCK_EMPLOYEES)}
- Announcements: ${JSON.stringify(MOCK_ANNOUNCEMENTS)}
- Leave Requests: ${JSON.stringify(MOCK_LEAVE_REQUESTS)}
- Attendance: ${JSON.stringify(MOCK_ATTENDANCE_RECORDS)}
Always format your responses using Markdown for better readability (bolding, lists, etc).
User question: "${userMessage}"`;

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "bot", content: text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full bg-violet-600 text-white shadow-lg shadow-violet-900/20 hover:bg-violet-700 hover:scale-105 transition-all duration-200",
          isOpen
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100",
        )}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] bg-white dark:bg-[#1a1d27] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none",
        )}
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-semibold">FlowDesk Assistant</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[450px] bg-gray-50 dark:bg-[#11131c] space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-start gap-3 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white",
                  msg.role === "user" ? "bg-violet-600" : "bg-gray-800",
                )}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-violet-600 text-white rounded-tr-none"
                    : "bg-white dark:bg-[#1a1d27] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-tl-none shadow-sm",
                )}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p
                          className="mb-2 last:mb-0 leading-relaxed"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc pl-4 mb-2 space-y-1"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal pl-4 mb-2 space-y-1"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="pl-1" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-semibold text-violet-700 dark:text-violet-300"
                          {...props}
                        />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 className="font-bold text-lg mb-2" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="font-semibold text-base mb-2"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="font-medium text-base mb-1" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-violet-500 hover:underline"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#1a1d27] border border-gray-200 dark:border-gray-800 rounded-tl-none shadow-sm flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d27] flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a question..."
            className="flex-1 max-h-32 min-h-[44px] bg-gray-100 dark:bg-[#11131c] border border-transparent focus:border-violet-500 focus:bg-white dark:focus:bg-[#11131c] rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white resize-none outline-none transition-all"
            rows={1}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
