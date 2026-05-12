const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api-dog',
    createProxyMiddleware({
      target: 'https://dog.ceo',
      changeOrigin: true,
      pathRewrite: {
        '^/api-dog': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        // Agregar headers si es necesario
        proxyReq.setHeader('Accept', 'application/json');
      },
    })
  );

  app.use(
    '/api-music',
    createProxyMiddleware({
      target: 'https://musicbrainz.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api-music': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Accept', 'application/json');
        proxyReq.setHeader('User-Agent', 'MusicApp/1.0 (test@example.com)');
      },
    })
  );

  app.use(
    '/api-vagalume',
    createProxyMiddleware({
      target: 'https://api.vagalume.com.br',
      changeOrigin: true,
      pathRewrite: {
        '^/api-vagalume': '',
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Accept', 'application/json');
      },
    })
  );
};
