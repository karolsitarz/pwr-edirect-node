module.exports = ({ name, endpoint }, res) => {
  const json = `
  {
    "short_name": "${name}",
    "name": "${name}",
    "icons": [
        {
          "src": "/${endpoint}/icon-192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "/${endpoint}/icon-512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ],
    "start_url": "./",
    "display": "standalone",
    "theme_color": "#ffffff",
    "background_color": "#f3f3f3"
  }
  `;
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': json.length
  });
  res.end(json);
};
