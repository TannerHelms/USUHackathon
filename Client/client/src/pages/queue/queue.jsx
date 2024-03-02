import { useNavigate } from "react-router-dom";
import AppContext from "../../utils/context";
import classes from "./Queue.module.css";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import uuid from "react-uuid";

function Queue() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [socket, setSocket] = useState();
  const [counter, setCounter] = useState(0);
  const [moves, setMoves] = useState([]);
  const [up, setUp] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [down, setDown] = useState(false);
  const timeout = 150;

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
    s.emit("setId", uuid());
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

    socket.on("player", (data) => {
      setMoves((old) => old.concat(data));
    });

    return () => {
      socket.off("new state", callback);
    };
  }, [socket]);

  useEffect(() => {
    console.log(moves);
  }, [moves]);

  // Increment the counter
  const increment = () => {
    socket.emit("increment");
  };

  const moveUp = () => {
    socket.emit("Up");
  };

  const moveDown = () => {
    socket.emit("Down");
  };
  const moveLeft = () => {
    socket.emit("Left");
  };

  const moveRight = () => {
    socket.emit("Right");
  };

  useEffect(() => {
    if (up) {
      const interval = setInterval(() => {
        moveUp();
      }, timeout);
      return () => clearInterval(interval);
    }
  }, [up]);

  useEffect(() => {
    if (down) {
      const interval = setInterval(() => {
        moveDown();
      }, timeout);
      return () => clearInterval(interval);
    }
  }, [down]);

  useEffect(() => {
    if (right) {
      const interval = setInterval(() => {
        moveRight();
      }, timeout);
      return () => clearInterval(interval);
    }
  }, [right]);

  useEffect(() => {
    if (left) {
      const interval = setInterval(() => {
        moveLeft();
      }, timeout);
      return () => clearInterval(interval);
    }
  }, [left]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 38) {
        setUp(true);
      }
      if (e.keyCode === 39) {
        setRight(true);
      }
      if (e.keyCode === 37) {
        setLeft(true);
      }
      if (e.keyCode === 40) {
        setDown(true);
      }
    }

    function handleKeyUp(e) {
      if (e.keyCode === 38) {
        setUp(false);
      }
      if (e.keyCode === 39) {
        setRight(false);
      }
      if (e.keyCode === 37) {
        setLeft(false);
      }
      if (e.keyCode === 40) {
        setDown(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const newPlayer = () => {
    socket.emit("createPlayer");
  };

  return (
    <section className="flex col g-20 bg-white p-10 br ycenter xcenter">
      {moves.map((move, idx) => {
        return <p>{move}</p>;
      })}
      <p className="center">
        {socket
          ? "Socket: succesfully connected to server"
          : "Socket: Failed to connect"}
      </p>
      <h1 className="center">Counter: {counter}</h1>
      <button onClick={increment}>Inc</button>
      <button onClick={moveUp}>Move Up</button>
      <button onClick={moveDown}>Move Down</button>
      <button onClick={moveLeft}>Move Left</button>
      <button onClick={moveRight}>Move Right</button>
      <button onClick={newPlayer}>New Player</button>
    </section>
  );
}

export default Queue;
