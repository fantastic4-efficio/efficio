import { useEffect, useState } from "react";
import { io } from "socket.io-client";



const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const socket = io("http://localhost:3000", {
      transports: ['websocket'],
    });


    socket.on("newMessage", (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input.trim()) {
      socket.emit("newMessage", input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat Box</h2>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
