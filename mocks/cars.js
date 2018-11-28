const request = require('supertest');
const debug = require('debug')('upexample:mock:cars');
const MyApp = require('../app');

const apiPath = '/services';

const colors = ['black', 'white', 'blue', 'green', 'gray', 'yellow'];
const getRandom = data => data[Math.floor(Math.random() * data.length)];
let brands = [];
let x = 1000;


const getRandomCar = () => {
  const brand = getRandom(brands);
  return {
    name: `carExample ${x}`,
    color: getRandom(colors),
    brandId: brand._id.toString(),
  };
};


const generateCars = async (up) => {
  if (x < 1) {
    console.info('End all');
    process.exit(0);
  }
  x -= 1;
  try {
    await runInsert(up, 'cars', getRandomCar());
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
      generateCars(up);
    });
}

const initTest = (up) => {
  setTimeout(async () => {
    console.info('running');
    brands = await up.services.find('/brands', {});
    generateCars(up);
  }, 1000);
};

MyApp(initTest);
