const faker = require('faker');

const citiesObjString = () => {
  let citiesObj = '"{ ';
  for (var i = 0; i < 10; i++) {
    let randomCity =
      faker.address.cityPrefix() + ' ' + faker.address.citySuffix();
    let randomFollowers = faker.random.number({ min: 1000, max: 100000 });

    citiesObj += "'" + randomCity + "': '" + randomFollowers.toString() + "', ";
  }
  citiesObj = citiesObj.slice(0, -2);
  citiesObj += ' }"';
  return citiesObj;
};

const bio = () => {
  let description =
    "'" +
    faker.lorem.sentences(faker.random.number({ min: 10, max: 22 })) +
    "'";
  return description;
};

module.exports.bio = bio;
module.exports.citiesObjString = citiesObjString;
