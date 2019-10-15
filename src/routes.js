const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const html = require('./html');
const offline = require('./offline');
const manifest = require('./manifest');
const sw = require('./service-worker');

const getEndpoint = req => require('./data')[req.baseUrl.slice(1)];

router.get('/', (req, res) => {
  if (req.query.reset != null) res.clearCookie(`x-${getEndpoint(req)}-always`);
  else if (req.cookies[`x-${getEndpoint(req)}-always`])
    return res.redirect(getEndpoint(req).url);
  if (req.query.redirect != null) return res.redirect(getEndpoint(req).url);
  if (req.query.always != null) {
    res.cookie(`x-${getEndpoint(req)}-always`, true);
    return res.redirect(getEndpoint(req).url);
  }

  html(getEndpoint(req), res);
});

router.get('/manifest.json', (req, res) => manifest(getEndpoint(req), res));
router.get('/icon-512.png', (req, res) => {
  const img = new Buffer(getEndpoint(req).img.split(',')[1], 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
});
router.get('/icon-192.png', (req, res) => {
  const img = new Buffer(getEndpoint(req).img.split(',')[1], 'base64');
  sharp(img)
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
  res.writeHead(200, {
    'Content-Type': 'application/javascript; charset=utf-8'
  });
  res.end(sw);
});
router.get('/offline.html', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': offline.length
  });
  res.end(offline);
});

module.exports = router;
