const mongojs = require('mongojs');
const express = require('express');
const http = require('http');

const db = mongojs('mongodb://127.0.0.1/test');

const Onion = {
  db,
  app: express(),
};

const getUsers = Application => () => new Promise((resolve, reject) => {
  Application.db.users.find({}, {}, (err, docs) => {
    if (err) return reject(err);
    return resolve(docs);
  });
});

const getLogs = Application => () => new Promise((resolve, reject) => {
  Application.db.logs.find({}, {}, (err, docs) => {
    if (err) return reject(err);
    return resolve(docs);
  });
});

Onion.services = {
  getUsers: getUsers(Onion),
  getLogs: getLogs(Onion),
};

const getAll = Application => async (req, res) => {
  try {
    const [users, logs] = await Promise.all([Application.services.getUsers(), Application.services.getLogs()]);
    return res.json({
      users,
      logs,
      timestamp: new Date().getTime(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end('error');
  }
};

Onion.controllers = {
  getAll: getAll(Onion),
};

Onion.app.get('/all', Onion.controllers.getAll);

http.createServer(Onion.app).listen(5000, () => console.info('ready *:5000'));
