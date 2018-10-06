const faker = require('faker');
const fs = require('fs');

function imageCreation() {
  let imagesArr = '"[';
  let imgNumber = faker.random.number({ min: 3, max: 8 });
  for (var i = 1; i <= imgNumber; i++) {
    let imageID = faker.random.number({ min: 1, max: 1000 });
    imagesArr +=
      '""' +
      `https://s3-us-west-1.amazonaws.com/imagesforartist/images/${imageID}.jpeg` +
      '"",';
  }
  imagesArr = imagesArr.slice(0, -1);
  imagesArr += ']"';
  return imagesArr;
}

let joinImageTable = nameCSV => {
  fs.writeFileSync(nameCSV, 'imagesarr\n');
  let counter = 0;
  let data = '';
  for (var i = 1; i <= 10; i++) {
    counter++;
    //artist id is i
    let artistID = i;

    let imageArr = imageCreation();

    data += `${imageArr}\n`;
    if (counter === 1) {
      fs.appendFileSync(nameCSV, data);
      data = '';
      console.log(counter, ' appended');
      counter = 0;
    }
  }
};

// joinImageTable('artisttest.csv');
module.exports.imageCreation = imageCreation;
// let joinImageTable = nameCSV => {
//   fs.writeFileSync(nameCSV, 'artistID,imageID\n');
//   let counter = 0;
//   let data = '';
//   for (var i = 1; i <= 10e6; i++) {
//     counter++;
//     //artist id is i
//     let artistID = i;

//     for (var j = 0; j < 4; j++) {
//       //number of cities to add to each artist
//       let imageID = faker.random.number({ min: 1, max: 1000 });

//       data += `${artistID},${imageID}\n`;
//     }
//     if (counter === 250000) {
//       fs.appendFileSync(nameCSV, data);
//       data = '';
//       console.log(counter, ' appended');
//       counter = 0;
//     }
//   }
// };
