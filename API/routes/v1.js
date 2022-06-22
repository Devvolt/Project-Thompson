/************************ 
 * 
 * 
 *      This is the first version of the Vollex RestAPI. It's easibly replacable and applicable to vanilla node + Express.JS servers.
 *      This makes just the basics to the interactions with the MySQL database that can be made.
 *      Future, more sophisticated, and most importantly, better versions will come with new features.
 * 
 *      Authors: Edoardo Borgia Leiva
 * 
 *      Version: 0.1.0-21.06.22
 * 
 * 
 ************************/

//Necessary Libraries

const express = require('express'); //The base express lib

// Enviroment variables

const router = express.Router() //Defines router as the function "express.Router()" to reduce weight.

// The actual Requests

// The interaction that can be made by the webpage and 3rd party services with the user list and info

router.get('/users/list', (req, res) => {

    // Gives the ENTIRE user list as a response in a JSON format.

    console.log(`${req.ip} requested user list (/v1/users/list)`);
});

router.get('/users', (req, res) => {

    //TODO: Make something idk.

    console.log(`${req.ip} requested user (/v1/users)`);
});

// The interactions that can be made with the credit system 

router.get('/credit', (req, res) => {

    //TODO: Make something idk.

    console.log(`${req.ip} requested user (/v1/credit)`);
});


// Other purposes

// NOTE: These are generally used as little jokes. Please, DO NOT implement more requests like these than necessary to ensure security in the codebase.

//TOP 10 YOUTUBERS WHO HAVE SWORN!!!!!11!!1!!1!1

router.get('/fuck', (req, res) => {

    //Just gives a "FUCK YOU" as a response (LMAO)

    res.send('FUCK YOU');                       //Number 1: Whoever uses this.
    console.log(`${req.ip} has sworn D:`);      // Thanks  for watching!!!11!1!
});

module.exports = router
