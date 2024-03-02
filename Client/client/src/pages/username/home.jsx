import classes from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../utils/context";

function Home() {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const handleUsername = (v) => {
    context.setUsername(v.target.value);
  };

  const queue = () => {
    if (context.getUsername()) {
      navigate("/queue");
    }
  };

  return (
    <div className="flex col bg-white br p-40 g-20">
      <h1>Enter a Username</h1>
      <input
        type="text"
        placeholder="Enter Username"
        onChange={handleUsername}
        value={context.getUsername()}
      />
      <button onClick={queue}>Join</button>
    </div>
  );
}

export default Home;
