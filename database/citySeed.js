const faker = require('faker');
const { convertArrayToCSV } = require('convert-array-to-csv');
const header = ['id', 'city'];
let cityArr = [];
let count = 0;
let cityCreation = () => {
  while (cityArr.length < 1000) {
    let city = [count++, faker.address.city()];
    cityArr.push(city);
  }
  const csvFromArrayOfArrays = convertArrayToCSV(cityArr, {
    header,
    separator: ',',
  });
  return csvFromArrayOfArrays;
};

module.exports.cityCreation = cityCreation;
