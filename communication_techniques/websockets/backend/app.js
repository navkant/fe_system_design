const express = require("express");
const { time } = require("node:console");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/ping", (req, res) => {
  console.log(`namespace-> ${io._nsps.keys()}`);

  io._nsps.keys().forEach((element) => {
    console.log(`element ${element}`);
  });

  res.json({ message: "api is live" });
});

app.get("/namespace", (req, res) => {
  console.log("get name space api called");
  res.json({ namespaces: [...io._nsps.keys()].splice(1) });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/namespace", (req, res) => {
  const { nsp } = req.body;
  console.log(`resuest body: ${nsp}`);
  if (nsp) {
    if (io._nsps.has(`/${nsp}`)) {
      return res.status(400).json({ message: "namespace already exists" });
    } else {
      const newNsp = io.of(`/${nsp}`);
      newNsp.on("connection", (socket) => {
        console.log(`a user connected to namespace ${socket.nsp.name}`);
        socket.on("chat message", (msg) => {
          console.log("message: " + msg);
          newNsp.emit("chat message", msg);
        });
        socket.on("disconnect", () => {
          console.log(`user disconnected from ${socket.nsp.name} namespace`);
        });
      });
      return res
        .status(201)
        .json({ message: `namespace /${nsp} created successfully` });
    }
  } else {
    return res.status(400).json({ message: "nsp is required" });
  }

  res.json({ message: "dev in progress" });
  // const { nsp } = req.body;
  // if (nsp) {
  //   if (io._nsps.has(`/${nsp}`)) {
  //     return res.status(400).json({ message: "namespace already exists" });
  //   } else {
  //     const newNsp = io.of(`/${nsp}`);
  //     newNsp.on("connection", (socket) => {
  //       console.log(`a user connected to namespace ${socket.nsp.name}`);

  //       socket.on("chat message", (msg) => {
  //         console.log("message: " + msg);
  //         newNsp.emit("chat message", msg);
  //       });

  //       socket.on("disconnect", () => {
  //         console.log(`user disconnected from ${socket.nsp.name} namespace`);
  //       });
  //     });
  //     return res
  //       .status(201)
  //       .json({ message: `namespace /${nsp} created successfully` });
  //   }
  // } else {
  //   return res.status(400).json({ message: "nsp is required" });
  // }
});

// const myNameSpace = io.of("/navkant");

// myNameSpace.on("connection", (socket) => {
//   console.log(`a user connected to namespace ${socket.nsp.name}`);

//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//     myNameSpace.emit("chat message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected from navkant namespace");
//   });
// });

server.listen(3000, () => {
  console.log("express server running at port 3000");
});
