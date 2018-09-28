const faker = require('faker');
const header = ['city', 'totalListeners'];
let cityCreation = () => {
  let citiesObj = {};
  let totalListeners = 0;
  for (var i = 0; i < 5; i++) {
    listenersPerCity = faker.random.number({
      min: 1000,
      max: 120000,
    });
    totalListeners += listenersPerCity;
    citiesObj[faker.address.city()] = listenersPerCity;
  }

  return [citiesObj, totalListeners];
};

module.exports.cityCreation = cityCreation;
