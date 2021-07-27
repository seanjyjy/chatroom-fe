import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MyGlobalContext, avatarType } from "./hooks/useGlobalContext";

import Chat from "./components/Chat";
import Login from "./components/Login";

import "./App.css";

function App() {
  const [avatar, setAvatar] = useState<avatarType>("boy1");
  const [name, setName] = useState("");
  return (
    <MyGlobalContext.Provider value={{ avatar, setAvatar, name, setName }}>
      <Router>
        <Switch>
          <Route component={Chat} exact path="/chat" />
          <Route component={Login} exact path="/" />
        </Switch>
      </Router>
    </MyGlobalContext.Provider>
  );
}

export default App;
