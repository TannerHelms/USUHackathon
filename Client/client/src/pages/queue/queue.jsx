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
    const s = io("http://129.123.181.235:8080");
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
    <section className="flex col g-20 bg-white p-10 br ycenter xcenter">
      <p className="center">
        {socket
          ? "Socket: succesfully connected to server"
          : "Socket: Failed to connect"}
      </p>
      <h1 className="center">Counter: {counter}</h1>
      <button onClick={increment}>Inc</button>
    </section>
  );
}

export default Queue;
