// /cars/audi.jpg


const request = require('supertest');
const debug = require('debug')('upexample:mock:photos');
const MyApp = require('../app');

const apiPath = '/services';
const getRandom = data => data[Math.floor(Math.random() * data.length)];
let cars = [];
let users = [];
let x = 1000;


const getRandomPhoto = () => {
  const car = getRandom(cars);
  const user = getRandom(users);
  return {
    carId: car._id.toString(),
    userId: user._id.toString(),
    photo: `/cars/${car.brands.name.toLowerCase()}.jpg`,
  };
};


const generateCars = async (up) => {
  if (x < 1) {
    console.info('End all');
    process.exit(0);
  }
  x -= 1;
  try {
    await runInsert(up, 'photos', getRandomPhoto());
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
        console.error('error: ', data);
      } else {
        debug(res.body);
      }
      generateCars(up);
    });
}

const initTest = (up) => {
  setTimeout(async () => {
    console.info('running');
    cars = await up.services.find('/cars', {});
    users = await up.services.find('/users', {});
    generateCars(up);
  }, 1000);
};

MyApp(initTest);
