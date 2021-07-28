import React from "react";
import { useSubscription } from "@apollo/client";
import { Avatar } from "@chakra-ui/react";
import { avatarType } from "../../hooks/useGlobalContext";

import { GET_MESSAGES } from "../../utils/constants";
import { imagesList } from "../../utils/imagesList";

import "./index.css";

interface MessagesProps {
  user: String;
}

interface QueryMessage {
  id: number;
  content: string;
  user: string;
  avatar: string;
}

interface QueryResult {
  messages: QueryMessage[];
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Messages = ({ user }: MessagesProps) => {
  const { data } = useSubscription<QueryResult>(GET_MESSAGES);
  if (!data) {
    return null;
  }

  // small trick we apply column-reverse later
  return (
    <div style={{ width: "50%", paddingLeft: "20px" }}>
      {data.messages
        .slice(0)
        .map(({ id, user: messageUser, content, avatar }) => (
          <div
            style={{
              display: "flex",
              justifyContent: user === messageUser ? "flex-end" : "flex-start",
              paddingBottom: "1em",
            }}
          >
            {user !== messageUser && (
              <div className="message-icon">
                <Avatar
                  src={imagesList[avatar as avatarType]}
                  className="message-icon-avatar"
                />
              </div>
            )}
            <div
              className="message-textbox"
              style={{
                background: user === messageUser ? "#059999" : "white",
                color: user === messageUser ? "white" : "#40444a",
              }}
            >
              <span className="message-name">
                {capitalizeFirstLetter(messageUser)}
              </span>
              <p style={{ transform: "translateY(5px)" }}>{content}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Messages;
