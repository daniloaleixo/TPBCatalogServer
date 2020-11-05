require('dotenv').config()
const fetch = require('node-fetch')
const path = require('path')
const cheerio = require('cheerio')
const http = require('http');
const express = require("express");




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
    fetch(process.env.BASE_URL + movie, {
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





const hostname = process.env.HOST
const port = process.env.PORT;

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static("dist"));
const server = http.createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/movies", async function (req, res) {
  const result = await queryMovie(req.query.q)
  res.send(result)
});





