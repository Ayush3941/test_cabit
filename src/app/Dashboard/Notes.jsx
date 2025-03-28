import React, { useState } from "react";
import "./Notes.css";

import { env } from "../../data/env/client"
import { z } from "zod"



const HUGGING_API_KEY = env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me anything.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");




  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { text: input, sender: "user" };
  setMessages([...messages, userMessage]);

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
   {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: input })
    });

    const data = await response.json();
    console.log("what is the data",data)
    const botReply = { text: data[0].generated_text || "Sorry, I couldn't process that.", sender: "bot" };

    setMessages((prev) => [...prev, botReply]);
  } catch (error) {
    setMessages((prev) => [...prev, { text: "Error fetching response.", sender: "bot" }]);
  }

  setInput("");
};






  return (
    <div className="chat-container">
      <div className="chat-box-wrapper">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-box ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Chatbot;
