const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const endpoints = require('./util/data');
const getManifest = require('./util/manifest');

router.get(['/', '/index.html'], (req, res) => {
  const { endpoint } = req;
  res.set('Service-Worker-Allowed', `/${endpoint}`);
  res.render('redirect', { endpoint, ...endpoints[endpoint] });
});

router.get('/manifest.json', (req, res) => {
  const { endpoint } = req;
  const manifest = getManifest({ endpoint, ...endpoints[endpoint] });
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': manifest.length
  });
  res.end(manifest);
});

const serveIcon = (size, req, res) => {
  const { endpoint } = req;
  sharp(`./src/icons/${endpoint}.png`)
    .resize(size)
    .toBuffer()
    .then(img => {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
    });
};

router.get('/icon-512.png', (req, res) => serveIcon(512, req, res));
router.get('/icon-192.png', (req, res) => serveIcon(192, req, res));

router.get('/service-worker.js', (req, res) => {
  const { endpoint } = req;
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  res.set('Service-Worker-Allowed', `/${endpoint}`);
  res.sendFile('/util/service-worker.js', { root: __dirname });
});

module.exports = router;
