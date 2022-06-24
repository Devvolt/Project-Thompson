//Libs

const app = require('express')();
const path = require('path');
const mongoose = require('mongoose');

// Routes

const route_assets = require('./routes/route_assets');
const route_api = require('./routes/route_api');

//Config files

const config = require('./config.json'); 
const port = config.port;



app.get('/', (q, s) => {
    s.status(200).redirect('/home');
});

app.get('/home', (q, s) => {
    s.status(200).sendFile(path.join( __dirname, "src", "assets", "pages", "home.html"));
});

app.get('/dashboard', (q, s) => {
    s.status(200).sendFile(path.join( __dirname, "src", "assets", "pages", "dashboard.html"));
});

// Routes

app.use('/assets', route_assets);
app.use('/api', route_api);

// Listener

app.listen(port, ()=>{
    console.log(`HTTP server started @ port: ${port}. Please, be sure to use a reverse proxy to inject an SSL cert and secure the data transfers between the client and server!`);
});