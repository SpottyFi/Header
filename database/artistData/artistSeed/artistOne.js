const faker = require('faker');
const fs = require('fs');
let city = require('../cityCreation.js');

const stream = fs.createWriteStream('../seed_data_90.json');

// const { MAX } = process.env;
console.log('Starting data generation');
stream.write('[');
for (let i = 9e6 + 1; i <= 10e6; i += 1) {
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
    id: i,
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
  console.log(i);
  stream.write(JSON.stringify(artist) + (i !== 10e6 ? ',' : ''));
}
stream.write(']');
stream.end(() => {
  console.log(counter, 'artists created, 4-5');
});
