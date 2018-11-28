const request = require('supertest');
const debug = require('debug')('upexample:mock:users');
const MyApp = require('../app');

const apiPath = '/services';

const lastnames = require('../dataset/lastnames');
const firstnames = require('../dataset/firstnames');

const domains = ['gmail.com', 'yahoo.com', 'truenorth.co', 'somedomain.com'];

const getRandom = data => data[Math.floor(Math.random() * data.length)];

let x = 100000;


const getRandomUser = () => {
  const firstname = getRandom(firstnames);
  const lastname = getRandom(lastnames);
  return {
    firstname,
    lastname,
    email: `${firstname}.${lastname}${x}@${getRandom(domains)}`,
  };
};


const generateUsers = up => async () => {
  if (x < 1) {
    console.info('End all');
    process.exit(0);
  }
  x -= 1;
  try {
    await runInsert(up, 'users', getRandomUser());
  } catch (err) {
    console.error('Falta Error: ', err);
  }
};


async function runInsert(up, module, data = {}) {
  request(up.app)
    .put(`${apiPath}/${module}`)
    .send(data)
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      if (err) {
        console.error('error: already exists: ', data);
      } else {
        debug(res.body);
      }
      generateUsers(up)();
    });
}

const initTest = (up) => {
  setTimeout(generateUsers(up), 1000);
};

MyApp(initTest);
