const faker = require('faker');
const fs = require('fs');
const coolImages = require('cool-images');
let city = require('./cityCreation.js');

const stream = fs.createWriteStream('../seed_data.json');

console.log('Starting data generation');
stream.write('[');
const MAX = 25000;
let counter = 0;
for (let i = 1; i <= MAX; i += 1) {
  let imageArr = [
    `https://s3-us-west-1.amazonaws.com/imagesforartist/images/${faker.random.number(
      { min: 1, max: 1000 },
    )}.jpeg`,
    `https://s3-us-west-1.amazonaws.com/imagesforartist/images/${faker.random.number(
      { min: 1, max: 1000 },
    )}.jpeg`,
    `https://s3-us-west-1.amazonaws.com/imagesforartist/images/${faker.random.number(
      { min: 1, max: 1000 },
    )}.jpeg`,
  ];
  let artist = {
    artistName: faker.name.findName(),
    followed: faker.random.boolean(),
    followersNumber: city.cityCreation()[1],
    verified: faker.random.boolean(),
    artistImages: imageArr,
    about: {
      Biography: faker.lorem.paragraphs(
        faker.random.number({ min: 5, max: 10 }),
        '\n\n',
      ),
      Where: city.cityCreation()[0],
    },
  };
  counter++;
  stream.write(JSON.stringify(artist) + (i !== MAX ? ',' : ''));
}
stream.write(']');
stream.end(() => {
  console.log(counter, 'artists created');
});
