import React, { useState, useEffect } from "react";
import "../styles/screens/Chatbot.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'

export default function ChatBot() {
  const [selected, setSelected] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [newChatDescription, setNewChatDescription] = useState("");

  function formatSteps(input) {
    let steps = input.split(/\d+\.\s/);
    steps = steps.filter(step => step.trim() !== '');
    return steps.join('\n').trim();
}
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/chats");
        setChatHistory(response.data);
      } catch (error) {
        console.error("Error fetching chat history", error);
        toast.error("Error fetching chat history");
      }
    };
    fetchChats();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === "" || selected === null) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const responseFromBot = await axios.post("http://localhost:5555/ask", { question: input });
      let botMessage = responseFromBot.data.answer;

      if (botMessage.includes('1.') && botMessage.match(/\d+\.\s/)) {
        botMessage = formatSteps(botMessage);
      }

      await axios.post(`http://localhost:5000/api/chats/${selected}/messages`, { sender: "user", text: input });
      await axios.post(`http://localhost:5000/api/chats/${selected}/messages`, { sender: "bot", text: botMessage });

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botMessage }]);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, there was an error processing your request.",
        },
      ]);
      setLoading(false);
      toast.error("Error sending message");
    }

    setInput("");
  };

  const handleNewChat = async () => {
    if (!newChatName.trim() || !newChatDescription.trim()) {
      return toast.warn("Please provide both a chat name and description.");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/chats", {
        chatName: newChatName,
        chatDescription: newChatDescription,
      });
      setChatHistory([...chatHistory, response.data]);
      setSelected(response.data._id);
      setMessages([]);
      setNewChatName("");
      setNewChatDescription("");
      toast.success("New chat created successfully");
    } catch (error) {
      console.error("Error creating new chat", error);
      toast.error("Error creating new chat");
    }
  };

  const handleChatSelect = async (id) => {
    setSelected(id);
    try {
      const response = await axios.get(`http://localhost:5000/api/chats/${id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching chat messages", error);
      toast.error("Error fetching chat messages");
    }
  };

  const handleDeleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/chats/${id}`);
      setChatHistory(chatHistory.filter((chat) => chat._id !== id));
      if (selected === id) {
        setSelected(null);
        setMessages([]);
      }
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat", error);
      toast.error("Error deleting chat");
    }
  };

  return (
    <div className="chatbot-container">
      <ToastContainer />
      <div className="sidebar">
        <div className="sidebar-title">
          <h5>Repairing Chatbot</h5>
        </div>
         <div className="sidebar-links">
          <Link style={{padding:"10px"}} to="/vendors" className="link"><i className="fa-solid fa-people-group"></i> Vendor List</Link>
          <Link  style={{padding:"10px"}} to="/feedback" className="link"><i className="fa-regular fa-message"></i> Feedback</Link>
          <Link  style={{padding:"10px"}} to="/report" className="link"><i className="fa-solid fa-bug"></i> Report</Link>
          <Link  style={{padding:"10px"}} to="/user-orders" className="link"><i className="fa-solid fa-triangle-exclamation"></i> My Order</Link>
          <Link  style={{padding:"10px"}} to="/settings" className="link"><i className="fa-solid fa-gear"></i> Settings</Link>
        </div>
      </div>
      <div className="chat-history">
        <h6 className="chat-history-heading">Chats History</h6>
        <div className="chat-form">
          <input
            type="text"
            placeholder="Chat Name"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Chat Description"
            value={newChatDescription}
            onChange={(e) => setNewChatDescription(e.target.value)}
          />
          <button onClick={handleNewChat}>New Chat</button>
        </div>
        <div className="chat-list">
          {chatHistory.length === 0 ? (
            <p>No chats available</p>
          ) : (
            chatHistory.map((item) => (
              <div className="chat-item" key={item._id}>
                <div onClick={() => handleChatSelect(item._id)}>
                  <h6>{item.chatName}</h6>
                  <p>{item.chatDescription}</p>
                </div>
                <button onClick={() => handleDeleteChat(item._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="chat-window">
        {selected !== null ? (
          <>
            <div className="chat-header">
              <h6>{chatHistory.find((chat) => chat._id === selected)?.chatName}</h6>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message-container ${msg.sender}`}>
                  <div className={`message ${msg.sender}`}>
                    {msg.sender === "bot" ? <i className="fa-solid fa-robot"></i> : <i className="fa-solid fa-user"></i>}
                    <div className="message-text"><h6>{formatSteps(msg.text)}</h6></div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="message-container bot">
                  <div className="message bot">
                    <i className="fa-solid fa-robot"></i>
                    <div className="message-text"><h6>Loading...</h6></div>
                  </div>
                </div>
              )}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}><i className="fa-solid fa-circle-chevron-right"></i></button>
            </div>
          </>
        ) : (
          <p>Select a chat to view messages</p>
        )}
      </div>
    </div>
  );
}
