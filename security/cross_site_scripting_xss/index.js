const express = require("express");

app = express();

app.get("/ping", (req, res) => {
  res.json({ message: "api live" });
});

app.listen(80, () => {
  console.log("express server running at 80");
});
