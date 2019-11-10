const express = require('express');
const router = express.Router();
const sharp = require('sharp');

// const html = require('./views/redirect');
// const offline = require('./views/offline');
// const sw = require('./util/service-worker');
const endpoints = require('./util/data');
const getEndpoint = req => req.baseUrl.slice(1);
const getManifest = require('./util/manifest');

router.get('/', (req, res) => {
  const endpoint = getEndpoint(req);
  res.render('redirect', { endpoint, ...endpoints[endpoint] });
});

router.get('/manifest.json', (req, res) => {
  const endpoint = getEndpoint(req);
  const json = getManifest({ endpoint, ...endpoints[endpoint] });
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': json.length
  });
  res.end(json);
});
router.get('/icon-512.png', (req, res) => {
  const endpoint = getEndpoint(req);
  sharp(`./src/icons/${endpoint}.png`)
    .toBuffer()
    .then(img => {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
    });
});
router.get('/icon-192.png', (req, res) => {
  const endpoint = getEndpoint(req);
  sharp(`./src/icons/${endpoint}.png`)
    .resize(192)
    .toBuffer()
    .then(img => {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
    });
});
// router.get('/service-worker.js', (req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'application/javascript; charset=utf-8'
//   });
//   res.end(sw);
// });
// router.get('/offline.html', (req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/html',
//     'Content-Length': offline.length
//   });
//   res.end(offline);
// });

module.exports = router;
