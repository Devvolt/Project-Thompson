const route = require('express').Router();
const path = require('path');

route.get('/Navbar.vue', (q, s) =>{
    s.status(200).sendFile(path.join( __dirname, "..", 'src', 'assets', 'components', 'Navbar.vue'));
});

module.exports = route
