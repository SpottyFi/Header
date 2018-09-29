const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');


let joinCityTable = (nameCSV) => {
  fs.writeFile(nameCSV, "artistID,cityID,followers");
  let counter = 0;
  let data = '\n'
  for (var i = 9e6; i < 10e6; i++) {
    counter++;
    //artist id is i
    let artist = i;
    console.log(i)
    for (var j = 0; j < 10; j++) {
      //number of cities to add to each artist
      let cityID = faker.random.number({ min: 0, max: 1000 });
      let listeners = faker.random.number({ min: 1000, max: 100000 });
      data += `\n${artist},${cityID},${listeners}`;
    }
    if (counter === 25000) {
      fs.appendFileSync(nameCSV, data);
      console.log(counter, ' appended')
      counter = 0;
    }
  }
