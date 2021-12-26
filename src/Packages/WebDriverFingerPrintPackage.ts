import { BrowserContextContract } from '../@types/Context';
import { PageContract } from '../@types/Page';
import PackagePlugin, { onNewPageCallback } from './PackagePlugin';

export interface WebDriverFingerPrintOptions {
    /**
     * Value of web-drive
     */
    value: boolean | undefined;
}

class WebDriverFingerPrintPackage extends PackagePlugin {

    public name: string;
    public version: string;
    public options: WebDriverFingerPrintOptions;

    constructor(options?: WebDriverFingerPrintOptions) {
        super();
        this.name = 'WebDriverFingerPrintPackage';
        this.version = '1.0.0';
        this.options = options || { value: undefined } as WebDriverFingerPrintOptions;
    }

    public async onNewPage(_context: BrowserContextContract<PageContract>): Promise<onNewPageCallback> {
        return {
            callback: ({ options }: { options: WebDriverFingerPrintOptions }) => {
                if (options.value === undefined) {
                    delete Object.getPrototypeOf(navigator).webdriver;
                    return;
                }

                if (navigator.webdriver === options.value) return;

                Object.defineProperty(Object.getPrototypeOf(navigator), 'webdriver', {
                    get: () => options.value,
                    set: () => { },
                    configurable: true,
                    enumerable: true
                });
            },
            params: {
                options: this.options,
            }
        };
    }

}

export default WebDriverFingerPrintPackage;