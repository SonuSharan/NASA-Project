const express = require('express');
const { httpGetAllPlanets } = require('../planets/planets.controller');
const planetsRouters = express.Router();
planetsRouters.get('/planets', httpGetAllPlanets);


module.exports = planetsRouters; 