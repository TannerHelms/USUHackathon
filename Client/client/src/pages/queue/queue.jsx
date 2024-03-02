import { useNavigate } from "react-router-dom";
import AppContext from "../../utils/context";
import classes from "./Queue.module.css";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

function Queue() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [socket, setSocket] = useState();
  const [counter, setCounter] = useState(0);

  // If there is no username, navigate home
  useEffect(() => {
    if (!context.getUsername()) {
      navigate("/");
    }
  }, []);

  // Set the socket up
  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // Establish Initial connection to server
  useEffect(() => {
    if (!socket) return;
    const callback = (v) => {
      setCounter(v);
    };
    socket.on("new state", callback);
    return () => {
      socket.off("new state", callback);
    };
  }, [socket]);

  // Increment the counter
  const increment = () => {
    socket.emit("increment");
  };

  return (
    <section className={classes.container}>
      <h1>Counter: {counter}</h1>
      <button onClick={increment}>Inc</button>
    </section>
  );
}

export default Queue;
