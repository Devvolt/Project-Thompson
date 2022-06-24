//Libs

const route = require('express').Router();

// Routes

const route_components = require('./route_components');
const route_img = require('./route_img');
const route_js = require('./route_js');

// Nested Routes

route.use('/components', route_components);
route.use('/img', route_img);
route.use('/js', route_js);



route.get('/', (q, s) => {
    s.status(200).send('CBT');
});



module.exports = route
