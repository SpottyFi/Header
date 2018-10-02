const faker = require('faker');

const imageArrString = () => {
  let imageString = '"[ ';
  for (var i = 0; i < 3; i++) {
    let random = faker.random.number({
      min: 1,
      max: 1000,
    });
    imageString +=
      "'" +
      `https://s3-us-west-1.amazonaws.com/imagesforartist/images/${random}.jpeg` +
      "'" +
      ', ';
  }
  imageString = imageString.slice(0, -2);
  imageString += ' ]"';
  return imageString;
};

module.exports.imageArrString = imageArrString;
