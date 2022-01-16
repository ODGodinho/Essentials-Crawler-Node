import { BrowserContract, BrowserLaunchOptionsContract, BrowserTypeContract } from '../@types/Browser';
import { BrowserContextContract, BrowserContextOptionsContract } from '../@types/Context';
import { PageContract } from '../@types/Page';
import PackagePlugin from '../Packages/PackagePlugin';
import Context from './Context';

class Browser<BrowserType extends BrowserTypeContract<PageType>, PageType extends PageContract, ContextType extends typeof Context> {

    public readonly browserType: BrowserType;

    public browser?: BrowserContract<PageType> | null;

    public contexts: Array<Context<BrowserType, PageType>> = [];

    public plugins: PackagePlugin[] = [];

    public readonly contextType: ContextType;

    constructor(browserType: BrowserType, contextType: ContextType) {
        this.browserType = browserType;
        this.contextType = contextType;
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
        const contextFunction = this.browser?.newContext?.bind(this.browser)
            || this.browser?.createIncognitoBrowserContext?.bind(this.browser);

        if (!context && !contextFunction) throw new Error("Context function/param is not available");

        const contextI = context || await contextFunction?.(options)

        if (!contextI) throw new Error("Context is invalid");

        const contextInstance = new this.contextType<BrowserType, PageType>(this, contextI);

        this.contexts.push(
            contextInstance
        );

        return contextInstance;
    }

}

export default Browser;