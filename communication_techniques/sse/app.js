import express from "express";

const app = express();

app.get("/ping", (req, res) => {
  res.json({ message: "api is live" });
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write("Connection successfull \n\n");

  let counter = 0;

  const intervalId = setInterval(() => {
    counter++;

    if (counter % 2) {
      res.write(`event: Hoolala\n`);
      res.write(`data: Hoolala: event ${counter} \n\n`);
    } else {
      res.write(`event: Jigalala\n`);
      res.write(`data: Jigalala: event ${counter} \n\n`);
    }
  }, 3000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
    console.log("sse closed");
  });
});

app.listen(5011, () => {
  console.log("SSE server started at port 5011");
});
