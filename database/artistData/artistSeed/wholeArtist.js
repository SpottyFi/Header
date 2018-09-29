const faker = require('faker');
const fs = require('fs');
const { exec } = require('child_process');
let city = require('../cityCreation.js');

const stream = fs.createWriteStream('../seed_data_89.json');

const processExecutable = (error, stdout, stderr) => {
  if (error) {
    console.error(stderr);
    return;
  }
  console.log(stdout);
};
//amount of object created
const MAX = 9e6; // change to larger number after testing

exec('node ./database/artistData/artistSeed/artistOne.js', processExecutable);
// exec(
//   'node ./database/artistData/artistSeed/artistTwo.js',
//   processExecutable,
// );

console.log('Starting data generation');
stream.write('[');

for (let i = 8e6 + 1; i <= MAX; i += 1) {
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
        faker.random.number({ min: 3, max: 7 }),
        '\n\n',
      ),
      Where: city.cityCreation()[0],
    },
  };
  stream.write(JSON.stringify(artist) + (i !== MAX ? ',' : ''));
}
stream.write(']');
stream.end(() => {
  console.log('artists created, 5-6');
});
