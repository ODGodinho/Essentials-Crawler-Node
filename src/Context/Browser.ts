import { BrowserContract, BrowserLaunchOptionsContract, BrowserTypeContract } from '../../@types/Browser';
import { BrowserContextContract, BrowserContextOptionsContract } from '../../@types/Context';
import { PageContract } from '../../@types/Page';
import Context from './Context';

class Browser<BrowserType extends BrowserTypeContract, PageType extends PageContract> {

    public readonly browserType: BrowserType;

    public browser?: BrowserContract;

    public contexts: Array<Context<BrowserType, PageType>> = [];

    constructor(browserType: BrowserType) {
        this.browserType = browserType;

    }

    private browserOptions(): BrowserLaunchOptionsContract {
        return {
            headless: false,
            args: [
                "--wm-window-animations-disabled",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-infobars",
                "--disable-blink-features=AutomationControlled",
            ],
        };
    }

    async initBrowser() {
        this.browser = await this.browserType.launch(this.browserOptions());
    }

    async newContext(options?: BrowserContextOptionsContract): Promise<Context<BrowserType, PageType>> {
        if (!this.browser) throw new Error("Browser is not available");

        const contextFunction = this.browser?.newContext?.bind(this.browser)
            || this.browser?.createIncognitoBrowserContext?.bind(this.browser);

        const context: BrowserContextContract<PageType> = await contextFunction(options);
        const contextInstance = new Context(this, context);

        this.contexts.push(
            contextInstance
        )

        return contextInstance;
    }

}

export default Browser;