import React from "react";

const MessageList = ({ messages, username }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={message.sender === username ? "sent" : "received"}
        >
          <span className="sender">{message.sender}</span>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
