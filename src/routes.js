const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const endpoints = require('./util/data');
const getEndpoint = req => req.baseUrl.slice(1);
const getManifest = require('./util/manifest');

router.get(['/', '/index.html'], (req, res) => {
  const endpoint = getEndpoint(req);
  res.set('Service-Worker-Allowed', `/${endpoint}`);
  res.render('redirect', { endpoint, ...endpoints[endpoint] });
});

router.get('/manifest.json', (req, res) => {
  const endpoint = getEndpoint(req);
  const manifest = getManifest({ endpoint, ...endpoints[endpoint] });
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': manifest.length
  });
  res.end(manifest);
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

router.get('/service-worker.js', (req, res) => {
  const endpoint = getEndpoint(req);
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.set('Service-Worker-Allowed', `/${endpoint}`);
  res.set('Content-Type', 'application/javascript');
  res.sendFile('/util/service-worker.js', { root: __dirname });
});

module.exports = router;
