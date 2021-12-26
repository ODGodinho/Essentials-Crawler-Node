import { BrowserTypeContract } from '../@types/Browser';
import { BrowserContextContract } from '../@types/Context';
import { PageContract } from '../@types/Page';
import PackagePlugin, { PackagePluginInterface } from '../Packages/PackagePlugin';
import BasePage from '../Pages/BasePage';
import Browser from './Browser';

class Context<BrowserType extends BrowserTypeContract<PageContract>, PageType extends PageContract> {

    public readonly browser: Browser<BrowserType, PageType>;

    public readonly context: BrowserContextContract<PageType>;

    public plugins: PackagePluginInterface[] = [];

    constructor(browser: Browser<BrowserType, PageType>, context: BrowserContextContract<PageType>) {
        this.browser = browser;
        this.context = context;
        this.onNewPageRegister(this.getContextPlugins());
    }

    public newPage(): Promise<PageType> {
        return this.context.newPage();
    }

    public pages(): Array<PageType> {
        return this.context.pages();
    }

    public use(plugins: Array<PackagePlugin>) {
        const push = this.plugins.push(...plugins);
        this.registerEventsPackages(plugins);
        return push;
    }

    public getContextPlugins() {
        return [
            ...this.browser.plugins,
            ...this.plugins,
        ];
    }

    private registerEventsPackages(plugins: Array<PackagePlugin>): void {
        this.onNewPageRegister(plugins);
    }

    private onNewPageRegister(plugins: Array<PackagePlugin>) {
        this.context.on("page", async (page: PageContract) => {
            await this.loadPagePackages(page, plugins);
        });
    }

    public async loadPagePackages(page: PageContract, plugins: Array<PackagePlugin>) {
        for (let i = 0; i < plugins.length; i++) {
            const plugin: PackagePluginInterface = plugins[i];
            const context = this.findContextInstance(page);
            const init = plugin.onNewPage && await plugin.onNewPage(context);
            await BasePage.addInitScript(page, init?.callback, init?.params || {});
        }
    }

    private findContextInstance(page: PageContract): Context<BrowserType, PageType> | undefined {
        return this.browser.contexts.find((context) => context.context === page.context());
    }

}

export default Context;