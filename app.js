const http = require('http');
const express = require('express');
const path = require('path');
const config = require('config');
const up = require('universal-pattern');


const controllers = require('./controllers');

const port = config.get('port');
const app = express();
const server = http.createServer(app);

const addHooks = (upInstance) => {
  upInstance.addHook('/carts', 'afterSearch', async (req, searchResults) => {
    console.info(searchResults);
    return Promise.resolve(searchResults);
  });
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, apikey, x-access-token');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  return next();
});


up(app, {
  swagger: {
    baseDoc: config.get('basePath'),
    host: `${config.get('host')}:${config.get('port')}`,
    folder: path.join(process.cwd(), 'swagger'),
    info: {
      version: 10.0,
      title: 'Universal Pattern Example',
      termsOfService: 'www.domain.com/terms',
      contact: {
        email: 'cesarcasas@bsdsolutions.com.ar',
      },
      license: {
        name: 'Apache License',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
  },
  compress: true,
  cors: true,
  database: {
    uri: config.get('connection.mongodb.uri'),
  },
})
  .then((upInstance) => {
    addHooks(upInstance);
    controllers(upInstance);
    server.listen(port, () => console.info(`listen *:${port}`));
  })
  .catch(err => console.error('Error initializing ', err));
