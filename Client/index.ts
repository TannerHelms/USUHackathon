import express from "express";
import { engine } from 'express-handlebars';
import { createServer } from "node:http";
import { Server } from "socket.io";
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

let COUNT = 0;

const DEBUG = process.env.NODE_ENV !== "production";
const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  let id = '';
  console.log("Connection recieved!");

  socket.on("setId", (data) => {
    id = data;
  })

  socket.on("Up", () => {
    console.log(`Up ${id}`)
    io.emit("Up", id)
  })
  socket.on("Down", () => {
    console.log(`Down ${id}`)
    io.emit("Down", id)
  })
  socket.on("Left", () => {
    console.log(`Left ${id}`)
    io.emit("Left", id)
  })
  socket.on("Right", () => {
    console.log(`Right ${id}`)
    io.emit("Right", id)
  })

  socket.on("createPlayer", () => {
    console.log(`creating new player... ${id}`)
    io.emit("newPlayer", id);
  })


  socket.on("disconnect", () => {
    console.log(`client left the server ${id}`);
    io.emit("delete", id)
  });
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}${req.url}`)
    } else {
      next();
    }
  });
}


console.log(MANIFEST);
app.get("/", (req, res) => {
  res.render('index', {
    debug: DEBUG,
    jsBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["file"],
    cssBundle: DEBUG ? "" : MANIFEST["src/main.jsx"]["css"][0],
    assetUrl: process.env.ASSET_URL || "http://localhost:5173",
    layout: false
  });
});

app.get("/random_number", (req, res) => {
  res.json({ number: Math.random() * 1000 });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.ASSET_URL}${process.env.PORT}...`);
});


