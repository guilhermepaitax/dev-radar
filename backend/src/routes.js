const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => res.send('Hello world!'));

module.exports = routes;