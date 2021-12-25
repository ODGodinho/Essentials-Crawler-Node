import { BrowserTypeContract } from '../../@types/Browser';
import { BrowserContextContract } from '../../@types/Context';
import { PageContract } from '../../@types/Page';
import Browser from './Browser';

class Context<BrowserType extends BrowserTypeContract, PageType extends PageContract> {

    public readonly browser: Browser<BrowserType, PageType>;

    public readonly context: BrowserContextContract<PageType>;

    constructor(browser: Browser<BrowserType, PageType>, context: BrowserContextContract<PageType>) {
        this.browser = browser;
        this.context = context;
    }

    public newPage(): Promise<PageType> {
        return this.context.newPage();
    }

    public pages(): Array<PageType> {
        return this.context.pages();
    }

}

export default Context;