require('dotenv').config()
const puppeteer = require('puppeteer');
let CronJob = require('cron').CronJob;

function msleep(n) {
	return new Promise(resolve => setTimeout(resolve, n))
}

function sleep(n) {
	return this.msleep(n*1000)
}

let loop = false;

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		// devtools: true
	});

	const page = await browser.newPage();
	page.setViewport({
		width : 1200,
		height : 800
	})
	await page.goto('https://my.ntu.edu.tw/');
  page.click('#loginbutton > a')
	page.on('requestfinished', async (request) => {
    if(request.url() === 'https://web2.cc.ntu.edu.tw/favicon.ico') {
      await page.type('#myTable > td > input', 'r09741018', {delay: 100})
      await page.type('#myTable2 > td > input', 'showjj51920A', {delay: 100})
      await page.click('#content > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=submit]')
		}
    if (request.url() === 'https://my.ntu.edu.tw/Default.aspx') {
      await page.goto('https://ntupesc.ntu.edu.tw/facilities/SessionLogin.aspx');
      await page.goto('https://ntupesc.ntu.edu.tw/facilities/PlaceGrd.aspx?buildingSeq=0&placeSeq=2&dateLst=2021/03/22')
    }
		// if(request.url() == 'https://syndication.twitter.com/settings' && !loop){
		// 	new CronJob('* 59 11 * * *', async function() {
		// 		while (page.url() == 'https://event.mi.com/tw/mff2019/sales/?utm_source=pc') {
		// 			await msleep(Math.floor((Math.random() * 20) + 1))
		// 			let element = await page.$('#sec_13 > div > div.slider-group > div > div:nth-child(2) > ul > li:nth-child(1) > div.info-box > div > div.right-info > a')
		// 			let text = await (await element.getProperty('textContent')).jsonValue();
		// 			loop = true
		// 			// page.click('#\\31 91_12_0 > div > div > a')
		// 			element.click()
		// 			console.log(text,'click!', new Date())
		// 		}
		// 	}, null, true);
		// }

		// if(request.url().includes('https://i01.appmifile.com/webfile/globalweb/stat/js/jquery.statData.min.js') && page.url().includes('https://buy.mi.com/tw/cart/index')){
		// 	page.click('#mi_checkout')
		// }

		// if(request.url().includes('https://i01.appmifile.com/webfile/globalweb/stat/js/jquery.statData.min.js') && page.url().includes('https://buy.mi.com/tw/buy/checkout')){
		// 	await msleep(70)
		// 	page.click('#checkoutFormBtn')
		// 	console.log('checkout!')
		// }
	})

	// await browser.close();
})();