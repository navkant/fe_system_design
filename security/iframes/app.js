import express from "express";

const app = express();

app.get("/ping", (req, res) => {
  res.json({ message: "api is live" });
});


app.listen(5011, () => {
  console.log("SSE server started at port 5011");
});
