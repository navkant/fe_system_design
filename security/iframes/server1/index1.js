const express = require("express");

const app = express();
app.use(express.static("public"));

app.get("/ping", (req, res) => {
  res.json({ message: "api is live" });
});

app.get("/example1", (req, res) => {
  res.sendFile(__dirname + "/public/example1.html");
});

app.get("/example2", (req, res) => {
  res.sendFile(__dirname + "/public/example2.html");
});

app.listen(5011, () => {
  console.log("SSE server started at port 5011");
});
