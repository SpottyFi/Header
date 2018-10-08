let sorter = objArr => {
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

exports.construction = response => {
  let top = sorter(response);
  let artistResponse = {
    artistImages: response[0].imagesarr,
    artistName: response[0].artistname,
    followed: response[0].followed,
    verified: response[0].verified,
    followersNumber: top[1],
    about: {
      biography: response[0].biography,
      where: top[0],
    },
  };
  return artistResponse;
};
