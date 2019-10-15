const express = require('express');
const app = express();

const endpoints = require('./src/data');
const routes = require('./src/routes');

app.use(require('cookie-parser')());
app.use('/:id', (req, res, next) => {
  if (!endpoints.hasOwnProperty(req.params.id)) res.status(404).send('lmao no');
  routes(req, res, next);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
