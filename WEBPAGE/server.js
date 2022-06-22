/************************
 *
 *      Authors: Edoardo Borgia Leiva, Guglielmo Bragato
 *
 *      Version: 0.1.0-21.06.22
 *
 ************************/

const express = require("express");
const path = require("path");
const axios = require("axios"); // Import Axios
const { URLSearchParams } = require("url");
const bodyParser = require("body-parser"); // Import body-parser
const mongoose = require("mongoose");
const { database, client_id, client_secret } = require("../config.json")

const db = require("./routes/Schemas/usersDB");

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Collegato al db");
  });

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args)); // Import node-fetch asynchronously; see https://www.npmjs.com/package/node-fetch#installation for more info on why this is done.

const app = express();

let port = 9202;

app.get("/", (req, res) => {
  console.log(`request to / from ${req.ip}`);
  res.sendFile(path.join(__dirname, "frontend", "app.html"));
});

// Assets

app.get("/assets/js/main.js", (req, res) => {
  console.log(`request to / from ${req.ip}`);
  res.sendFile(path.join(__dirname, "frontend", "js", "main.js"));
});

app.get("/assets/js/App.vue", (req, res) => {
  console.log(`request to / from ${req.ip}`);
  res.sendFile(path.join(__dirname, "frontend", "js", "App.vue"));
});


// Vue Components

app.get("/assets/components/Navbar.vue", (req, res) => {
  console.log(`request to /assets/components/Navbar.vue from ${req.ip}`);
  res.sendFile(
    path.join(__dirname, "frontend", "js", "components", "Navbar.vue")
  );
});

app.get("/assets/components/LogInWithDiscord.vue", (req, res) => {
  console.log(`request to /assets/components/LogInWithDiscord.vue from ${req.ip}`);
  res.sendFile(
    path.join(__dirname, "frontend", "js", "components", "LogInWithDiscord.vue")
  );
});

// app.get("/assets/components/navbar.js", (req, res) => {
//   console.log(`request to /assets/components/navbar.js from ${req.ip}`);
//   res.sendFile(
//     path.join(__dirname, "frontend", "js", "components", "navabar.js")
//   );
// });

// Teapot

app.get("/teapot", (req, res) => {
  res.sendStatus(418);
  console.log(`request to /teapot from ${req.ip}`);
});

/* DISCORD LOGIN START */


function make_config(authorization_token) {
  data = {
    headers: {
      authorization: `Bearer ${authorization_token}`,
    },
  };
  return data;
}

/* Configure the app */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.text());

app.post("/user", (req, res) => {
  const data_1 = new URLSearchParams();
  data_1.append("client_id", client_id);
  data_1.append("client_secret", client_secret);
  data_1.append("grant_type", "authorization_code");
  data_1.append("redirect_uri", `https://vollex.cc/`);
  data_1.append("scope", "identify");
  data_1.append("code", req.body);

  fetch("https://discord.com/api/v8/oauth2/token", {
    method: "POST",
    body: data_1,
  })
    .then((response) => response.json())
    .then((data) => {
      axios
        .get(
          "https://discordapp.com/api/v8/users/@me",
          make_config(data.access_token)
        )
        .then((response) => {
          // console.log(coso);

          db.findOne({ _id: response.data.id }, async (err, doc) => {
            if (!doc) {
              db.create({
                _id: respose.data.id,
              });
            } else {
              console.log(doc.coins);
            }
            monete = doc.coins;

            // function switchTo(val) {
            //           var cons = " ";

            //             switch (val){
            //               case 0:
            //                 cons = `, Dude you are Giga-Chad u reached ${doc.coins} coins, my compliments, Soldier! 🪖`;
            //                 break;
            //               case 1000000:
            //                 cons = `, Wtf bro are u acer? u have ${doc.coins} coin(s) are u kidding me?`;
            //                 break;
            //               case  0:
            //                 cons = `, Tu hai rispettivamente ${doc.coins} monete`;
            //                 break;
            // }
            // return cons;
            // }

            if (doc.coins > 1000000) {
              cons = `, Dude you are Giga-Chad u reached ${doc.coins} coins, my compliments, Soldier! 🪖`;
            } else if (doc.coins > 0) {
              cons = `, Tu hai rispettivamente ${doc.coins} monete`;
            } else if (doc.coins < 0) {
              cons = `, Wtf bro are u acer? u have ${doc.coins} coin(s) are u kidding me?`;
            }

            const coso = { coins: cons, user: response.data };
            res.status(200).send(coso);
          });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
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
