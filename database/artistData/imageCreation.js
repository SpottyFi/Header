const coolImages = require('cool-images');
const download = require('image-downloader');
let imageArr = coolImages.many(700, 700, 300);
console.log(__dirname, ' the directory');

let successes = 0;
async function imageDownload() {
  for (var i = 0; i < imageArr.length; i++) {
    const options = {
      url: imageArr[i],
      dest: '/home/arthur/Desktop/images',
    };
    await download
      .image(options)
      .then(({ filename, image }) => {
        successes++;
        console.log(successes, ' success');
      })
      .catch(err => {
        console.log(err, ' an error occured bitch');
      });
  }
  console.log('complete with successes totalling to ', successes);
}
