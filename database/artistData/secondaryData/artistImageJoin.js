const faker = require('faker');
const fs = require('fs');

let joinImageTable = nameCSV => {
  fs.writeFileSync(nameCSV, 'artistID,imageID\n');
  let counter = 0;
  let data = '';
  for (var i = 1; i <= 10e6; i++) {
    counter++;
    //artist id is i
    let artistID = i;

    for (var j = 0; j < 4; j++) {
      //number of cities to add to each artist
      let imageID = faker.random.number({ min: 1, max: 1000 });

      data += `${artistID},${imageID}\n`;
    }
    if (counter === 250000) {
      fs.appendFileSync(nameCSV, data);
      data = '';
      console.log(counter, ' appended');
      counter = 0;
    }
  }
};

joinImageTable('joinimageWhole.csv');
