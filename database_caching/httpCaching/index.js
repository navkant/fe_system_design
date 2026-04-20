const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  // res.setHeader("Cache-Control", "public, max-age=86400");
  // res.setHeader("Cache-Control", "public, max-age=30");
  // res.setHeader("Expires", "Fri, 17 Apr 2026 04:52:39 GMT");
  res.set("Cache-Control", "public, max-age=35, must-revalidate");
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), {
    etag: false,
    cacheControl: false,
    lastModified: false,
  }),
);

app.get("/index", (req, res) => {
  console.log(new Date());
  res.send({ message: new Date() });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
