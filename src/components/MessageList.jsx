import React from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
