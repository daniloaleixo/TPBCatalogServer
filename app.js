require('dotenv').config();
const fetch = require('node-fetch')


async function shutDown() {
  console.log("\n👋Bye Bye👋");
  run = false;
  process.exit();
}





async function queryMovie(movie) {
  const data = await getMovies(movie)
  console.log(data)

  
}

async function getMovies(movie) {
  return new Promise((res, rej) => {
    fetch("https://tpb.party/search/" + movie, {
      "headers": {
        "upgrade-insecure-requests": "1",
      },
      "referrer": "https://www.pirate-bay.net/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "omit"
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        res(data)
      })
      .catch(err => rej(err))
  })
}

async function main() {
  console.clear();
  console.log("=========================");
  await queryMovie('tenet')
};








main();

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);