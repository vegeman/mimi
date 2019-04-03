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
	await page.goto('https://account.xiaomi.com/pass/serviceLogin?callback=http%3A%2F%2Fbuy.mi.com%2Ftw%2Flogin%2Fcallback%3Ffollowup%3Dhttps%253A%252F%252Fwww.mi.com%252Ftw%252F%26sign%3DZGY3MjQzOTBlOTU1OWE1ODBhNDUxM2NmNDliMDkzZGEyZDIyODVlNA%2C%2C&sid=mi_xiaomitw&_locale=zh_TW&checkSafePhone=false');
	await page.type('#username', process.env.ACCOUNT)
	await page.type('#pwd', process.env.PASSWORD)
	page.click('#login-button')
	page.on('requestfinished', async (request) => {
		if(request.url() == 'https://www.mi.com/tw/') {
			await page.goto('https://event.mi.com/tw/mff2019/sales/?utm_source=pc')
		}
		if(request.url() == 'https://syndication.twitter.com/settings' && !loop){
			// new CronJob('* 00 12 * * *', async function() {
				while (page.url() == 'https://event.mi.com/tw/mff2019/sales/?utm_source=pc') {
					await msleep(200)
					let element = await page.$('#sec_13 > div > div.slider-group > div > div:nth-child(1) > ul > li:nth-child(1) > div.info-box > div > div.right-info > a')
					let text = await (await element.getProperty('textContent')).jsonValue();
					loop = true
					// page.click('#\\31 91_12_0 > div > div > a')
					element.click()
					console.log(text,'click!', new Date())
				}
			// }, null, true);
		}

		if(request.url().includes('https://i01.appmifile.com/webfile/globalweb/stat/js/jquery.statData.min.js') && page.url().includes('https://buy.mi.com/tw/cart/index')){
			page.click('#mi_checkout')
		}

		if(request.url().includes('https://i01.appmifile.com/webfile/globalweb/stat/js/jquery.statData.min.js') && page.url().includes('https://buy.mi.com/tw/buy/checkout')){
			await msleep(70)
			page.click('#checkoutFormBtn')
			console.log('checkout!')
		}
	})

	// await browser.close();
})();