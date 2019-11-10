const express = require('express');
const app = express();

const endpoints = require('./src/util/data');
const routes = require('./src/routes');
const main = require('./src/ejs/mainpage');

app.use('/:id', (req, res, next) => {
  if (!endpoints.hasOwnProperty(req.params.id)) res.status(404).send('lmao no');
  routes(req, res, next);
});
app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': main.length
  });
  res.end(main);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
