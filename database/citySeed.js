const faker = require('faker');

let cityArr = [];
let count = 0;
while (cityArr.length < 1000) {
  let city = [count++, faker.address.city()];
  cityArr.push(city);
}
