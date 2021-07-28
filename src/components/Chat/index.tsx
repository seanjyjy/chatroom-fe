import React, { useState, KeyboardEvent } from "react";
import { Avatar, Box, Button, Input } from "@chakra-ui/react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import Messages from "../Messages";
import { POST_MESSAGE } from "../../utils/constants";
import { imagesList } from "../../utils/imagesList";

import "./index.css";

// creating a websocket link connected to the server which is localhost:4000
const link = new WebSocketLink({
  uri: "wss://serene-earth-24117.herokuapp.com/",
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: "https://serene-earth-24117.herokuapp.com/",
  cache: new InMemoryCache(),
});

const Chat = () => {
  const { name, avatar } = useGlobalContext();
  const [state, stateSet] = useState({
    user: name,
    content: "",
    avatar: avatar,
  });
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      ...state,
      content: "",
    });
  };

  return (
    <div className="chat">
      <Box
        w="100%"
        h="60px"
        bg="white"
        display="grid"
        placeItems="center"
        mb="1px"
        borderBottom="1px solid rgb(230, 235, 242)"
      >
        <Box w="50%" d="flex" h="60px" alignItems="center" pl="20px">
          <Avatar src={imagesList[avatar]} />
          <p className="avatar-name">{name}</p>
        </Box>
      </Box>

      <Box
        w="100%"
        d="flex"
        h="100%"
        alignItems="center"
        overflow="auto"
        flexDir="column-reverse"
      >
        <Messages user={state.user} />
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        d="flex"
        pl="4"
        w="50%"
        borderColor="#46CBC6"
        bg="white"
        h="56px"
      >
        <Input
          color="#059999"
          _placeholder={{ color: "teal" }}
          w="100%"
          placeholder="Write a message..."
          variant="unstyled"
          value={state.content}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            stateSet({
              ...state,
              content: evt.target.value,
            })
          }
          onKeyUp={(evt: KeyboardEvent<HTMLInputElement>) => {
            if (evt.keyCode === 13) {
              onSend();
            }
          }}
        />
        <Button
          onClick={() => onSend()}
          bg="#46CBC6"
          color="white"
          h="100%"
          w="100px"
        >
          Send
        </Button>
      </Box>
    </div>
  );
};

const wrapper = () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);

export default wrapper;
