import { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";
import Button from "./componets/button/button"
import { Quote } from "./requests/quote.js"
function App() {
  const [count, setCount] = useState(0)
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("new state", (newCount) => {
      setCount(newCount);
      if (loading) {
        setLoading(false);
      }
    });
    socket.on("notification", (n) => {
      setNotification(n);
    });
  }, [socket, loading]);


  function getQuote() {
    if (!socket) return;
    socket.emit("quote");
    Quote().then(resp => setQuote(resp))
  }

  useEffect(() => {
    getQuote();
  }, []);

  function increment() {
    socket.emit("increment");
  }

  function decrement() {
    socket.emit("decrement");
  }

  return (
    <>
      {notification &&
        <div className='notification'>
          <p>{notification}</p>
          <Button text="close" onClickFunc={() => setNotification(null)}></Button>
        </div>
      }

      <div className='main'>
        <p>{quote['content']}</p>
        <h1>{loading ? "Loading... " : count}</h1>
        <Button text="Increment" onClickFunc={increment}></Button>
        <Button text="Decrement" onClickFunc={decrement}></Button>
        <Button text="Get Quote" onClickFunc={getQuote}></Button>
      </div>
    </>
  )
}

export default App
