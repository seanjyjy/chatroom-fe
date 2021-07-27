import React, { useState } from "react";
import { Box, Input, Avatar, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { avatarType, useGlobalContext } from "../../hooks/useGlobalContext";

import { imagesList } from "../../utils/imagesList";

import "./index.css";

const Login = () => {
  const { avatar, setAvatar, name, setName } = useGlobalContext();
  const history = useHistory();
  const [isEmptyName, setIsEmptyName] = useState(false);

  const onSubmit = () => {
    if (!!!name) {
      setIsEmptyName(true);
      return;
    }
    history.push("/chat");
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        w="30%"
        h="75%"
        borderRadius="20px"
        p={10}
        border="1px"
        borderColor="teal"
        alignItems="center"
        d="flex"
        flexDir="column"
      >
        <p className="login-header">Select your Avatar</p>
        <Box
          d="flex"
          flexWrap="wrap"
          gridGap={16}
          gridTemplateColumn="auto auto auto"
          alignItems="center"
          justifyContent="center"
          py={10}
        >
          {Object.entries(imagesList).map(([key, value]) => {
            console.log(value);
            return (
              <Avatar
                size="xl"
                name={key}
                key={key}
                src={value}
                style={{
                  boxShadow: avatar === key ? "0 0 0 3pt #008080" : "initial",
                }}
                onClick={() => setAvatar(key as avatarType)}
              />
            );
          })}
        </Box>

        <p className="login-header margin-bottom-15">
          What should we call you?
        </p>
        <Input
          variant="flushed"
          placeholder="Enter a nickname"
          colorScheme="teal"
          focusBorderColor="teal"
          color="gray.500"
          isRequired={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (isEmptyName) {
              setIsEmptyName(false);
            }
            setName(e.target.value);
          }}
        />
        <span
          className="error-message"
          style={{ visibility: isEmptyName ? "visible" : "hidden" }}
        >
          Please enter a name
        </span>

        <Button colorScheme="teal" size="lg" onClick={onSubmit} m={5}>
          Lets Go!
        </Button>
      </Box>
    </div>
  );
};

export default Login;
