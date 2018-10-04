exports.sorter = objArr => {
  let topCities = {};
  let count = 0;
  let totalFollowers = 0;
  for (let i = 0; i < objArr.length; i += 1) {
    let city = objArr[i].city;
    let followers = objArr[i].followers;
    totalFollowers += followers;
    if (count < 6) {
      topCities[city] = followers;
      count++;
    }
  }
  return [topCities, totalFollowers];
};

let citiesArr = [
  {
    city: 'Cieloville',
    followers: 316832,
  },
  {
    city: 'Reynoldshaven',
    followers: 301088,
  },
  {
    city: 'Anikaland',
    followers: 265012,
  },
  {
    city: 'North Vito',
    followers: 210607,
  },
  {
    city: 'Annabellshire',
    followers: 203374,
  },
  {
    city: 'Gleichnerview',
    followers: 158577,
  },
  {
    city: 'Port Rosalyn',
    followers: 86889,
  },
  {
    city: 'Princesschester',
    followers: 77998,
  },
  {
    city: 'Feilville',
    followers: 71925,
  },
  {
    city: 'New Camilla',
    followers: 16046,
  },
];
