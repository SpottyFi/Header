const faker = require('faker');
const fs = require('fs');
const image = require('./artistData/secondaryData/imageArray.js');
let artist = nameCSV => {
  fs.writeFileSync(
    nameCSV,
    'artistID, artistName,followed,followersNumber,verified,biography,imagesarr\n',
  );
  let counter = 0;
  let data = '';
  for (var i = 1 + 5e6; i <= 10e6; i++) {
    counter++;
    let artistID = i;
    let artistName = faker.name.findName();
    let followed = faker.random.boolean();
    let followedNumber = 0;
    let verified = faker.random.boolean();
    let biography = faker.lorem.sentences(
      faker.random.number({ min: 7, max: 14 }),
    );
    let imagesarr = image.imageCreation();
    data += `${artistID},${artistName},${followed},${followedNumber},${verified},${biography},${imagesarr}\n`;

    if (counter === 250000) {
      fs.appendFileSync(nameCSV, data);
      console.log(counter);
      data = '';
      counter = 0;
    }
  }
};

artist('artist_510.csv');
