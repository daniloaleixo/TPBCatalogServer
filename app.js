require('dotenv').config()
const fetch = require('node-fetch')
const cheerio = require('cheerio')


async function shutDown() {
  console.log("\n👋Bye Bye👋")
  run = false
  process.exit()
}





async function queryMovie(movie) {
  const data = await getMovies(movie)
  const $ = cheerio.load(data)
  const names = $(".detName").map((i, elem) => {
    return elem.childNodes[1].firstChild.data
  });
  const links = $('a[title="Download this torrent using magnet"]').map((i, elem) => elem.attribs.href);

  const array = []

  for (let i = 0; i < names.length; i++) {
    array.push({
      name: names[i],
      link: links[i]
    })
  }


  return array
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
        return res.text()
      })
      .then(data => {
        res(data)
      })
      .catch(err => rej(err))
  })
}

async function main() {
  console.clear()
  console.log("=========================")
  const x = await queryMovie('tenet')
  console.log(x)
}








main()

process.on("SIGINT", shutDown)
process.on("SIGTERM", shutDown)