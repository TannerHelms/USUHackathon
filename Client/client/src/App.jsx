import { useEffect } from "react";
import { io } from "socket.io-client";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AppContext from "./utils/context";
import "./App.css";
function App() {
  const [socket, setSocket] = useState();
  const [username, sUsername] = useState("");

  const getUsername = () => {
    return username;
  };

  const setUsername = (u) => {
    sUsername(u);
  };

  const contextSettings = {
    getUsername,
    setUsername,
  };

  // useEffect(() => {
  //   const s = io();
  //   setSocket(s);
  //   return () => {
  //     s.disconnect();
  //   };
  // }, []);

  return (
    <AppContext.Provider value={contextSettings}>
      <div className="flex col xcenter ycenter vh-100 p-10">
        <Outlet />
      </div>
    </AppContext.Provider>
  );
}

export default App;
