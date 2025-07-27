import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useTypewriter } from "../hooks/userTypewriter";

export default function AIInterfaceWithViewer({ pdfFile, resData }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const pluginInstance = defaultLayoutPlugin();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const existing = localStorage.getItem("chatHistory");
    if (existing) setChatHistory(JSON.parse(existing));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("chatHistory");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  useEffect(() => {
    if (!pdfFile) {
      setFileUrl(null);
      return;
    }
    const url = URL.createObjectURL(pdfFile);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pdfFile]);

  const lastMsg = chatHistory[chatHistory.length - 1];
  const aiTyping = useTypewriter(
    lastMsg?.sender === "ai" && !loading ? lastMsg.message : ""
  );

  // Auto scroll chat container down as AI types
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [aiTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", message: input.trim() };
    const placeholderAI = { sender: "ai", message: "Thinking..." };
    const updatedChat = [...chatHistory, userMsg, placeholderAI];

    setChatHistory(updatedChat);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://google-notebook-lm-clone-server.vercel.app/ask",
        // "http://localhost:5000/ask",
        {
          question: input,
        }
      );

      const aiData = {
        sender: "ai",
        message: res.data.ans || "No response found.",
        ...(res.data || {}),
      };

      // Replace placeholder with real message
      const finalChat = [...chatHistory, userMsg, aiData];
      setChatHistory(finalChat);
    } catch (err) {
      const errorMsg = {
        sender: "ai",
        message: "Something went wrong. Try again.",
      };
      const finalChat = [...chatHistory, userMsg, errorMsg];
      setChatHistory(finalChat);
    } finally {
      setLoading(false);
    }
  };

  const formatAIMessage = (msg) => {
    const paragraphs = msg.split("\n").filter((line) => line.trim() !== "");
    return paragraphs.map((para, idx) => (
      <p key={idx} className="mb-2 text-sm text-gray-800 leading-relaxed">
        {para}
      </p>
    ));
  };

  return (
    <div className="flex h-[96.7vh]">
      {/* Chat Area */}
      <div className="w-1/2 border-r border-gray-300 p-4 flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto bg-gray-100 rounded p-3 space-y-4"
        >
          {chatHistory.length === 0 ? (
            <h1 className="text-black bg-purple-200 border border-purple-700 rounded-sm py-4 px-2">
              {resData.message}
            </h1>
          ) : (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-2xl px-4 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-300 rounded-bl-none"
                  }`}
                >
                  {msg.sender === "ai" ? (
                    msg.message === "Thinking..." ? (
                      <span className="italic text-gray-400">Thinking...</span>
                    ) : index === chatHistory.length - 1 && !loading ? (
                      formatAIMessage(aiTyping)
                    ) : (
                      formatAIMessage(msg.message)
                    )
                  ) : (
                    msg.message
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Ask about the document..."
            className="flex-1 p-2 border rounded-l focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button
            className={`px-4 py-2 rounded-r text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-1/2 p-4 overflow-y-auto bg-white">
        {fileUrl ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={fileUrl} plugins={[pluginInstance]} />
          </Worker>
        ) : (
          <p className="text-center text-gray-500 mt-10">No PDF selected.</p>
        )}
      </div>
    </div>
  );
}
