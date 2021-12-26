import { BrowserContract, BrowserLaunchOptionsContract, BrowserTypeContract } from '../@types/Browser';
import { BrowserContextContract, BrowserContextOptionsContract } from '../@types/Context';
import { PageContract } from '../@types/Page';
import PackagePlugin from '../Packages/PackagePlugin';
import Context from './Context';

class Browser<BrowserType extends BrowserTypeContract<PageType>, PageType extends PageContract> {

    public readonly browserType: BrowserType;

    public browser?: BrowserContract<PageType>;

    public contexts: Array<Context<BrowserType, PageType>> = [];

    public plugins: PackagePlugin[] = [];

    constructor(browserType: BrowserType) {
        this.browserType = browserType;
    }

    protected browserOptions(): BrowserLaunchOptionsContract {
        return {
            headless: false,
            args: [
            ],
        };
    }

    public async initBrowser() {
        this.browser = await this.browserType.launch(this.browserOptions());
    }

    public use(packages: Array<PackagePlugin>) {
        return this.plugins.push(...packages);
    }

    public async newContext(options?: BrowserContextOptionsContract, context?: BrowserContextContract<PageType>): Promise<Context<BrowserType, PageType>> {
        if (!this.browser) throw new Error("Browser is not available");

        const contextFunction = this.browser?.newContext?.bind(this.browser)
            || this.browser?.createIncognitoBrowserContext?.bind(this.browser);

        if (!contextFunction) throw new Error("Context function is not available");

        const contextI: BrowserContextContract<PageType> = context || await contextFunction(options);
        const contextInstance = new Context(this, contextI);

        this.contexts.push(
            contextInstance
        );

        return contextInstance;
    }

}

export default Browser;