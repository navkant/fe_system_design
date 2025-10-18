const express = require("express");

app = express();

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Header", "nosniff");
  res.setHeader("X-XSS-Protection", 0); // deprecated now... use CSP headers instead
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  res.removeHeader("X-Powered-By");
  next();
});

app.get("/ping", (req, res) => {
  res.json({ message: "api is live" });
});

app.get("/new-path", (req, res) => {
  res.send("<h1>This is the new path.</h1>");
});

app.get("/old-path", (req, res) => {
  res.send(
    "<h1>Click here <a href='http://localhost:5011/new-path'>here</a></h1>"
  );
  //   res.redirect("/ping");
});

app.listen(80, () => {
  console.log("SSE server started at port 5011");
});
