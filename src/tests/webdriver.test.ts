import { test, expect } from "@playwright/test";
import { chromium } from 'playwright-core';
import Browser from '../Context/Browser';
import Context from '../Context/Context';
import WebDriverFingerPrintPackage from '../Packages/WebDriverFingerPrintPackage';
import { BrowserInterface, TestInterface } from './Type';
// import { TestInterface } from './Type.d.tsss';

test.describe('Web Driver Testes', () => {
    const BrowserInstance = new Browser(chromium, Context);

    test.beforeAll(async ({ browser }: BrowserInterface) => {
        BrowserInstance.browser = browser;
    })

    test("Web Driver False", async ({ context, page }: TestInterface) => {
        const Context = await BrowserInstance.newContext(undefined, context);
        await Context.loadPagePackages(page, [
            new WebDriverFingerPrintPackage({ value: false }),
        ]);
        await page.goto("https://bot.sannysoft.com/", { waitUntil: "commit" });
        expect(await page.evaluate("navigator.webdriver")).toBe(false);
    });

    test("Web Driver true", async ({ context, page }: TestInterface) => {
        const Context = await BrowserInstance.newContext(undefined, context);
        await Context.loadPagePackages(page, [
            new WebDriverFingerPrintPackage({ value: true }),
        ]);
        await page.goto("https://bot.sannysoft.com/", { waitUntil: "commit" });
        expect(await page.evaluate("navigator.webdriver")).toBe(true);
    });

    test("Web Driver undefined", async ({ context, page }: TestInterface) => {
        const Context = await BrowserInstance.newContext(undefined, context);
        await Context.loadPagePackages(page, [
            new WebDriverFingerPrintPackage({ value: undefined }),
        ]);
        await page.goto("https://bot.sannysoft.com/", { waitUntil: "commit" });
        expect(await page.evaluate("navigator.webdriver")).toBe(undefined);
    });

});
