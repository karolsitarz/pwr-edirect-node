module.exports = ({ name, endpoint }) => `
  {
    "short_name": "${name}",
    "name": "${name}",
    "icons": [
        {
          "src": "/${endpoint}/icon-192.png",
          "type": "image/png",
          "sizes": "192x192",
          "purpose": "maskable any"
        },
        {
          "src": "/${endpoint}/icon-512.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "maskable any"
        }
      ],
    "start_url": "./",
    "display": "standalone",
    "theme_color": "#ffffff",
    "background_color": "#f3f3f3"
  }
  `;
