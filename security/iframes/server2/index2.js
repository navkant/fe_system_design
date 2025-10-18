const express = require("express");

const app = express();
app.use((req, res, next) => {
  // res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  next();
});
app.use(express.static("public"));

app.get("/ping", (req, res) => {
  res.json({ message: "api is live" });
});

app.get("/iframe-website1", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-website1.html");
});

app.get("/iframe-website2", (req, res) => {
  res.sendFile(__dirname + "/public/iframe-website2.html");
});

app.listen(3011, () => {
  console.log("SSE server started at port 3011");
});
