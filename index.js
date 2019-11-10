const express = require('express');
const app = express();

const endpoints = require('./src/util/data');
const routes = require('./src/routes');

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { data: endpoints });
});

app.get('/style.css', (req, res) => {
  res.sendFile('./src/views/style.css', { root: __dirname });
});

app.use('/:id', (req, res, next) => {
  const endpoint = req.params.id;
  if (!endpoints.hasOwnProperty(endpoint)) {
    res.redirect('/');
    return;
  }
  req.endpoint = req.baseUrl.slice(1);
  routes(req, res, next);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
