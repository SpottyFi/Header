const faker = require('faker');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

const csvWriter = createCsvWriter({
  header: ['imageID', 'imageURL'],
  path: '../allCSVFiles/images.csv',
});

async function imageCreation() {
  let imagesArr = [];
  for (var i = 1; i <= 1000; i++) {
    imagesArr.push([
      i,
      `https://s3-us-west-1.amazonaws.com/imagesforartist/images/${i}.jpeg`,
    ]);
  }
  let result = await csvWriter
    .writeRecords(imagesArr)
    .then(console.log('done bitch'));
  return result;
}
