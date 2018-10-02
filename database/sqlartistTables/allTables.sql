CREATE TABLE Artists(
    artistID INTEGER PRIMARY KEY,
    artistName VARCHAR(160),
    followed Boolean,
    followedNumber int,
    verified Boolean,
    Biography VARCHAR(1000)
);

CREATE TABLE Cities(
    cityID INTEGER PRIMARY KEY, 
    city VARCHAR(160)
);

CREATE TABLE Images(
    imageID INTEGER PRIMARY KEY, 
    imageURL VARCHAR(160)
);

CREATE TABLE CitiesJoin (
    artistID INTEGER references Artists(artistID),
    cityID INTEGER references Cities(cityID),
    followers INTEGER
);

CREATE TABLE ImagesJoin (
    artistID INTEGER references Artists(artistID),
    imageID INTEGER references images(imageID)
);