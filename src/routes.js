const express = require('express');
const router = express.Router();
// const sharp = require('sharp');

// const html = require('./views/redirect');
// const offline = require('./views/offline');
// const manifest = require('./util/manifest');
// const sw = require('./util/service-worker');
const endpoints = require('./util/data');

const getEndpoint = req => req.baseUrl.slice(1);

router.get('/', (req, res) => {
  const endpoint = getEndpoint(req);
  res.render('redirect', { endpoint, ...endpoints[endpoint] });
});

// router.get('/manifest.json', (req, res) => manifest(getEndpoint(req), res));
// router.get('/icon-512.png', (req, res) => {
//   const img = new Buffer(getEndpoint(req).img.split(',')[1], 'base64');
//   res.writeHead(200, {
//     'Content-Type': 'image/png',
//     'Content-Length': img.length
//   });
//   res.end(img);
// });
// router.get('/icon-192.png', (req, res) => {
//   const img = new Buffer(getEndpoint(req).img.split(',')[1], 'base64');
//   sharp(img)
//     .resize(192)
//     .toBuffer()
//     .then(img => {
//       res.writeHead(200, {
//         'Content-Type': 'image/png',
//         'Content-Length': img.length
//       });
//       res.end(img);
//     });
// });
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
