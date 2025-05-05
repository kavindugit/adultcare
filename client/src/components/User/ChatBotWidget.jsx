import { useState } from "react";
import axios from "axios";
import { marked } from "marked";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/chatbot/chat", {
        message: input,
      });

      const rawText = res.data.reply;
      const formatted = marked.parseInline(rawText); // ✅ Convert Markdown to inline HTML

      const botMessage = { sender: "bot", html: formatted };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errMsg = { sender: "bot", text: "Sorry, I'm currently unavailable." };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white text-2xl flex items-center justify-center rounded-full cursor-pointer shadow-lg z-50"
      >
        💬
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-white rounded-xl shadow-2xl flex flex-col z-50">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-xl">
            <span className="font-semibold">Elder Bliss Assistant</span>
            <button onClick={toggleChat} className="text-xl font-bold">&times;</button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-4 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-200 self-start mr-auto"
                }`}
              >
                {msg.html ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.html }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-200 px-4 py-2 rounded-lg max-w-[80%] text-sm">
                Typing...
              </div>
            )}
          </div>

          <div className="flex items-center border-t px-3 py-2">
            <input
              type="text"
              className="flex-1 text-sm px-3 py-2 border rounded-md outline-none"
              placeholder="Ask your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;
