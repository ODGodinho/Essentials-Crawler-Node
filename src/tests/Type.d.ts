import { BrowserContextContract } from '../@types/Context';
import { PageContract } from '../@types/Page';
import { Page, Context } from "@playwright/test"

export type PageInterface = PageContract & Page;

export interface BrowserInterface {
    browser: BrowserContract<PageInterface>
}

export interface TestInterface {
    context: BrowserContextContract<PageContract & Page> & Context,
    page: PageContract & Page
}
