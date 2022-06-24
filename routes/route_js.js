const route = require('express').Router();
const path = require('path');

route.get('/main.js', (q, s) =>{
    s.status(200).sendFile(path.join( __dirname, "..", 'src', 'assets', 'js', 'main.js'));
});

route.get('/main.vue', (q, s) => {
    s.status(200).semdFile(path.join( __dirname, "..", 'src', 'assets', 'js', 'main.vue'));
});

module.exports = route