import { BrowserContextOptions } from '§crawler-core§';
import { BrowserContext } from '§crawler-core§';
import { PageContract } from './Page';

export interface BrowserContextOptionsContract extends BrowserContextOptions {

}

export interface BrowserContextContract<PageType extends PageContract> extends BrowserContext {
    /**
    * Returns the browser instance of the context. If it was launched as a persistent context null gets returned.
    */
    browser(): null | BrowserContract;

    /**
     * Creates a new page in the browser context.
     */
    newPage(): Promise<PageType>;

    /**
     * Returns all open pages in the context.
     */
    pages(): Array<PageType>;

}