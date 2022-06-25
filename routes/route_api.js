//Libs

const route = require('express').Router();
const route_v1 = require('./route_api_v1');

route.use('/v1', route_v1);

module.exports = route
