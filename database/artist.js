const faker = require('faker');
const fs = require('fs');

let artist = nameCSV => {
  fs.writeFileSync(
    nameCSV,
    'artistID, artistName,followed,followersNumber,verified,biography',
  );
  let counter = 0;
  let data = '';
  let multiple = 1;
  for (var i = 1; i <= 10e6; i++) {
    counter++;
    let artistID = i;
    let artistName = faker.name.findName();
    let followed = faker.random.boolean();
    let followedNumber = 0;
    let verified = faker.random.boolean();
    let biography = faker.lorem.sentences(
      faker.random.number({ min: 7, max: 14 }),
    );
    data += `\n${artistID},${artistName},${followed},${followedNumber},${verified},${biography}`;

    if (counter === 250000) {
      fs.appendFileSync(nameCSV, data);
      console.log(multiple, ' appended');
      multiple++;
      data = '';
      counter = 0;
    }
  }
};

artist('artistAll.csv');
