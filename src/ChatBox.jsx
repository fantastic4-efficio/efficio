import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");  // Correct port for the server

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chatMessage", (messages) => {
      setMessages((prev) => [...prev, messages]);
      console.log(messages);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chatMessage", input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat Box</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;