require('dotenv').config();
const puppeteer = require('puppeteer');


if (!process.env.BASE_URL) throw 'BASE_URL not configured' 
const baseUrl = process.env.BASE_URL
const userAgent = (process.env.userAgent || 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

const showBrowser = true; // false state equ headless mode;


var browserConfig = {
  headless: !showBrowser,
  args: [
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
};


async function launchBrowser() {
  console.log("=========================");
  console.log('📱 Launching browser...');
  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();

  console.log('🔧 Setting User-Agent...');
  await page.setUserAgent(userAgent); //Set userAgent

  console.log('⏰ Setting timeouts...');
  await page.setDefaultNavigationTimeout(process.env.timeout || 0);
  await page.setDefaultTimeout(process.env.timeout || 0);

  return {
    browser,
    page
  };
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function shutDown() {
  console.log("\n👋Bye Bye👋");
  run = false;
  process.exit();
}





async function queryMovie(page, movie) {
  console.log("Query movie: ", movie)

  await page.goto(baseUrl + 'search?q=' + movie);
  await page.screenshot({path: 'example1.png'});
  
  //  Close pop up
  if (!bodyHTML.match(/No thanks/g)) {
    await page.click('.close-btn')
  }
}

async function main() {
  console.clear();
  console.log("=========================");
  // cookie = await readLoginData();
  var { browser, page } = await launchBrowser();


  console.log('>> Browser ready')

  console.log('Navigating to home page...')
  await page.goto(baseUrl, {
    "waitUntil": "networkidle0"
  });

  await queryMovie(page, 'tenet')
};








main();

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);