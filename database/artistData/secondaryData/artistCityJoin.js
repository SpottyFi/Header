const faker = require('faker');
const fs = require('fs');

let joinCityTable = nameCSV => {
  fs.writeFileSync(nameCSV, 'artistID,cityID,followers\n');
  let counter = 0;
  let data = '';
  for (var i = 1; i <= 3; i++) {
    counter++;
    //artist id is i
    let artist = i;
    for (var j = 0; j < 10; j++) {
      //number of cities to add to each artist
      let cityID = faker.random.number({ min: 1, max: 1000 });
      let listeners = faker.random.number({ min: 1000, max: 350000 });
      data += `${artist},${cityID},${listeners}\n`;
    }
    if (counter === 1) {
      fs.appendFileSync(nameCSV, data);
      data = '';
      console.log(counter, ' appended');
      counter = 0;
    }
  }
};
