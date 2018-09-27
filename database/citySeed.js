const faker = require('faker');
const { convertArrayToCSV } = require('convert-array-to-csv');
const header = ['id', 'city', 'totalListeners'];
let cityArr = [];
let count = 0;
let cityCreation = () => {
  while (cityArr.length < 1000) {
    let totalListeners = 0;
    let followingCities = faker.random.number({ min: 5, max: 10 });
    let citiesObj = {};
    for (var i = 0; i < followingCities; i++) {
      listenersPerCity = faker.random.number({
        min: 1000,
        max: 120000,
      });
      citiesObj[faker.address.city()] = listenersPerCity;
      totalListeners += listenersPerCity;
    }
    let city = [count++, citiesObj, totalListeners];
    cityArr.push(city);
  }
  const csvFromArrayOfArrays = convertArrayToCSV(cityArr, {
    header,
    separator: ',',
  });
  return csvFromArrayOfArrays;
};

module.exports.cityCreation = cityCreation;
