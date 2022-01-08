import { BrowserContextContract } from '../@types/Context';
import { PageContract } from '../@types/Page';
import { Page, BrowserContext } from "@playwright/test"
import { BrowserContract } from '..';

export type PageInterface = PageContract & Page;

export interface BrowserInterface {
    browser: BrowserContract<PageInterface>
}

export interface TestInterface {
    context: BrowserContextContract<PageContract & Page> & BrowserContext,
    page: PageContract & Page
}
