import Browser from './Context/Browser';
import { Page, BrowserType, chromium } from 'playwright';
import ExampleGoogleCrawlerController from './Controllers/ExampleGoogleCrawlerController';
const browser = new Browser<BrowserType, Page>(chromium);

browser.initBrowser()
.then(async () => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const Crawler = new ExampleGoogleCrawlerController(page);
        await Crawler.exampleSearch();

        console.log("Done...");
        process.exit();
});