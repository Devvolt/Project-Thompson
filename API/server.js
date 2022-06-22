const express = require("express");
const path = require("path");

const app = express();

const v1Router = require("./routes/v1");

let port = 9009;

app.get("/", (req, res) => {
  res.sendStatus(418);
  console.log(`: Request to / from ${req.ip}`);
});

app.use("/v1", v1Router);

//Listener

app.listen(port, () => {
  console.log(`API Server running at port: ${port}`);
});
