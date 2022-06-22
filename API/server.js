/************************ 
 * 
 * 
 *      This is the Base Server of the Vollex RestAPI. It's meant to have the attached version ti make it work properly.
 *      This makes just the basics to the interactions with the MongoDB database that can be made.
 *      Future, more sophisticated, and most importantly, better versions will come with new features.
 * 
 *      Authors: Edoardo Borgia Leiva
 * 
 *      Version: 1.1-22.06.22
 * 
 * 
 ************************/

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
