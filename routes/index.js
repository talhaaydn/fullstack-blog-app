const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.json({ message: 'Index' });
});

module.exports = routes;