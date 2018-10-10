const faker = require('faker');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

const csvWriter = createCsvWriter({
  header: ['cityID', 'city'],
  path: '../cities.csv',
});

async function cityCreation() {
  let citiesArr = [];
  for (var i = 1; i <= 1000; i++) {
    citiesArr.push([i, faker.address.city()]);
  }
  let result = await csvWriter
    .writeRecords(citiesArr)
    .then(console.log('done bitch'));
  return result;
}

cityCreation();
