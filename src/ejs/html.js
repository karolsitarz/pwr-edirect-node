module.exports = (ep, res) => {
  const { name, endpoint } = ep;

  const html = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>PWR-edirect - ${name}</title>
      <meta property="og:title" content="PWR-edirect - ${name}">
      <meta property="og:description" content="Proste skróty przekierowań do najważniejszych stron studenta PWR ✨">
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://sitarz.tk/pwr-edirect/${endpoint}">
      <meta name="theme-color" content="#ffffff">
      <link rel="manifest" href="/${endpoint}/manifest.json">
      <link rel="icon" type="image/png" href="/${endpoint}/icon-512.png" />
      <link rel="shortcut icon" type="image/png" href="/${endpoint}/icon-512.png" />
      <style>
        body,html{width:100%;height:100%;margin:0;text-align:center}main{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;max-width:900px;margin:auto;font-family:sans-serif;font-size:30px}*{position:relative;box-sizing:border-box}input{cursor:pointer;font:inherit}h1{margin:0}#redirect{border:none;padding:0.5em 2em;border-radius:0.5em;margin-top:3em;margin-bottom:0.5em;background:rgba(0,0,0,0.1);font-weight:bold}label{cursor:pointer;display:flex;justify-content:center;align-items:center;font-size:0.75em}label #checkbox{width:1em;height:1em;border-radius:0.25em;background:rgba(0,0,0,0.2);display:inline-block;margin-right:0.5em}label #checkbox::after{content:"";width:50%;height:50%;position:absolute;left:50%;top:50%;border-radius:25%;background:black;transition:transform 0.2s ease;transform-origin:center;transform:translate(-50%, -50%) scale(0)}label #always{display:none}label #always:checked+#checkbox::after{transform:translate(-50%, -50%) scale(1)}
      </style>
    </head>
    <body>
      <main>
        <h1>${name}</h1>
        <input id="redirect" type="button" value="przejdź">
        <label>
          <input id="always" type="checkbox" checked>
          <div id="checkbox"></div>
          <span>zawsze</span>
        </label>
      </main>
      <noscript>You have to enable JavaScript to use this tool.</noscript>
      <script>
        document.getElementById("redirect").onclick = () => {
          if (document.getElementById("always") && document.getElementById("always").checked)
            window.location = window.location.origin + window.location.pathname + '?always'
          else window.location = window.location.origin + window.location.pathname + '?redirect'
        }
        navigator.serviceWorker.register("/${endpoint}/service-worker.js");
      </script>
    </body>
    </html>
  `;
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length
  });
  res.end(html);
};
