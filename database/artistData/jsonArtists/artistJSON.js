const faker = require('faker');
const fs = require('fs');
const ab = require('./cities.js');
const image = require('./images.js');

let artist = nameCSV => {
  fs.writeFileSync(
    nameCSV,
    'artistID,artistName,followed,followersNumber,verified,artistImages,biography,cityListeners\n',
  );
  let counter = 0;
  let data = '';
  for (var i = 4e6 + 1; i <= 10e6; i++) {
    counter++;
    let artistID = i;
    let artistName = faker.name.findName();
    let followed = faker.random.boolean();
    let followedNumber = 0;
    let verified = faker.random.boolean();
    let artistImages = image.imageArrString();
    let biography = ab.bio();
    let where = ab.citiesObjString();

    data += `${artistID},\'${artistName}\',${followed},${followedNumber},${verified},${artistImages},${biography},${where}\n`;

    if (counter === 100000) {
      fs.appendFileSync(nameCSV, data);
      console.log(counter, ' appended');
      data = '';
      counter = 0;
    }
  }
};

artist('artists410.csv');
