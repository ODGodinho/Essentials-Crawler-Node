#!/bin/bash

read -p "Crawler :
1 - playwright (Recommended)
2 - puppeteer
" crawler_id

case "$crawler_id" in
    1)
        name="playwright";
        rm -rf ./src/puppeteer.sample.ts;
        mv ./src/playwright.sample.ts ./src/index.ts;
        sed -i "s/\/\*§BrowserLaunchOptionImport§\*\//import { LaunchOptions as BrowserLaunchOptions, Browser } from \"$name-core\";/g" ./\@types/Browser.d.ts;;
    2)
        name="puppeteer";
        rm -rf ./src/playwright.sample.ts;
        mv ./src/puppeteer.sample.ts ./src/index.ts;
        sed -i "s/\/\*§BrowserLaunchOptionImport§\*\//import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Browser } from \"$name-core\"\ntype BrowserLaunchOptions = (LaunchOptions \& BrowserLaunchArgumentOptions \& BrowserConnectOptions);/g" ./\@types/Browser.d.ts;;
    *) echo "Invalid type"; exit;;
esac

yarn add "$name" "$name-core"
sed -i "s/§crawler§/$name/g" ./\@types/Page.d.ts
sed -i "s/§crawler-core§/$name-core/g" ./\@types/Context.d.ts
sed -i "s/\/\*§BrowserLaunchOptionExtends\*\//extends BrowserLaunchOptions/g" ./\@types/Browser.d.ts
