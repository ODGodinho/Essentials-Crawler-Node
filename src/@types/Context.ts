import { BrowserContract } from './Browser';
import { PageContract } from './Page';

export interface BrowserContextOptionsContract {

}

export interface BrowserContextContract<PageType extends PageContract> {
    /**
    * Returns the browser instance of the context. If it was launched as a persistent context null gets returned.
    */
    browser(): null | BrowserContract<PageType>;

    /**
     * Creates a new page in the browser context.
     */
    newPage(): Promise<PageType>;

    /**
     * Returns all open pages in the context.
     */
    pages(): Array<PageType>;

    /**
     * Context Events
     */
    on: Function;

}