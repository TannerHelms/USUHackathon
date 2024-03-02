import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Router, RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./pages/username/home.jsx";
import Queue from "./pages/queue/queue.jsx";

const router = createHashRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/queue",
        element: <Queue />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
