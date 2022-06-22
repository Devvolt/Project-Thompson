/************************ 
 * 
 *      Authors: Edoardo Borgia Leiva, Guglielmo Bragato
 * 
 *      Version: 0.1.0-21.06.22
 * 
 ************************/

const express = require('express');
const path = require('path');
const axios = require("axios"); // Import Axios
const { URLSearchParams } = require("url");
const bodyParser = require("body-parser"); // Import body-parser
const mongoose = require("mongoose")



const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args)); // Import node-fetch asynchronously; see https://www.npmjs.com/package/node-fetch#installation for more info on why this is done.


const app = express();

let port = 9202;

app.get('/', (req, res)=>{
    console.log(`request to / from ${req.ip}`);
    res.sendFile(path.join(__dirname,"frontend", "app.html"));
});

app.get('/assets/js/main.js', (req, res)=>{
    console.log(`request to / from ${req.ip}`);
    res.sendFile(path.join(__dirname,"frontend", "js", "main.js"));
});


app.get('/teapot', (req, res)=>{
    res.sendStatus(418);
    console.log(`request to /teapot from ${req.ip}`);
});

// DISCORD LOGIN

/* Client Variables */
const client_id = "831972597877047337"; // Paste your bot's ID here
const client_secret = "e7VSP0FwG-gbVYQiQ5cV0t-hzQ5Xnuzg"; // Paste your bot's secret here

/* Make a function to give us configuration for the Discord API */
function make_config(authorization_token) {
  // Define the function
  data = {
    // Define "data"
    headers: {
      // Define "headers" of "data"
      authorization: `Bearer ${authorization_token}`, // Define the authorization
    },
  };
  return data; // Return the created object
}

/* Configure the app */
app.use(express.urlencoded({ extended: false })); // configure the app to parse requests with urlencoded payloads
app.use(express.json()); // configure the app to parse requests with JSON payloads
app.use(bodyParser.text()); // configure the app to be able to read text

/* Handle POST Requests */
app.post("/user", (req, res) => {
  // Will run when there are any incoming POST requests to http://localhost:(port)/user. Note that a POST request is different from a GET request, so this won't exactly work when you actually visit http://localhost:(port)/user
  /* Create our Form Data */
  const data_1 = new URLSearchParams(); // Create a new formData object with the constructor
  data_1.append("client_id", client_id); // Append the client_id variable to the data
  data_1.append("client_secret", client_secret); // Append the client_secret variable to the data
  data_1.append("grant_type", "authorization_code"); // This field will tell the Discord API what you are wanting in your initial request.
  data_1.append("redirect_uri", `https://vollex.cc/`); // This is the redirect URL where the user will be redirected when they finish the Discord login
  data_1.append("scope", "identify"); // This tells the Discord API what info you would like to retrieve. You can change this to include guilds, connections, email, etc.
  data_1.append("code", req.body); // This is a key parameter in our upcoming request. It is the code the user got from logging in. This will help us retrieve a token which we can use to get the user's info.
  

  fetch("https://discord.com/api/v8/oauth2/token", {
    method: "POST",
    body: data_1,
  })
    .then((response) => response.json())
    .then((data) => {
      // Make a request to the Discord API with the form data, convert the response to JSON, then take it and run the following code.
      axios
        .get(
          "https://discordapp.com/api/v8/users/@me",
          make_config(data.access_token)
        )
        .then((response) => {
            const coso = {'user': response.data}
          res.status(200).send(coso); // Send the username with a status code 200.
          console.log(response)
        })
        .catch((err) => {
          // Handle any errors in the request (such as 401 errors).
          console.log(err); // Log the error in the console
          res.sendStatus(500); // Send a 500 error.
        });
    });
});





// 404 PAGE
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "errors", "404.html"));
});



// Listener

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
