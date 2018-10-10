const faker = require('faker');
const fs = require('fs');
const image = require('./secondaryData/imageArray.js');
let artist = nameCSV => {
  fs.writeFileSync(
    nameCSV,
    'artistID,artistName,followed,followersNumber,verified,biography',
  );
  let counter = 0;
  let data = '';
  for (var i = 1; i <= 5; i++) {
    counter++;
    let artistID = i;
    let artistName = faker.name.findName();
    let followed = faker.random.boolean();
    let followedNumber = 0;
    let verified = faker.random.boolean();
    let biography = faker.lorem.sentences(
      faker.random.number({ min: 7, max: 14 }),
    );
    let imagearr = image.imageCreation();
    data += `\n${artistID},${artistName},${followed},${followedNumber},${verified},${biography},${imagearr}`;

    if (counter === 1) {
      fs.appendFileSync(nameCSV, data);
      console.log(counter, ' appended');
      counter = 0;
    }
  }
};

artist('artist_5.csv');
