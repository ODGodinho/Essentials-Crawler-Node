import Browser from './Context/Browser';
import puppeteer, { Page } from 'puppeteer';
import ExampleGoogleCrawlerController from './Controllers/ExampleGoogleCrawlerController';
const browser = new Browser<typeof puppeteer, Page>(puppeteer);

browser.initBrowser()
.then(async () => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const Crawler = new ExampleGoogleCrawlerController(page);
        await Crawler.exampleSearch();

        console.log("Done...");
        process.exit();
});