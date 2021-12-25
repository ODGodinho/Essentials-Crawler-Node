import { BrowserContextContract, BrowserContextOptionsContract } from './Context';
/*§BrowserLaunchOptionImport§*/

export interface BrowserLaunchOptionsContract /*§BrowserLaunchOptionExtends*/  {
    /**
     * Additional arguments to pass to the browser instance. The list of Chromium flags can be found
     * [here](http://peter.sh/experiments/chromium-command-line-switches/).
     */
    args?: Array<string>;

    channel?: string;

    devtools?: boolean;

    /**
     * If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is
     * deleted when browser is closed. In either case, the downloads are deleted when the browser context they were created in
     * is closed.
     */
    downloadsPath?: string;

    /**
     * Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is
     * resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium, Firefox
     * or WebKit, use at your own risk.
     */
    executablePath?: string;

    /**
     * Firefox user preferences. Learn more about the Firefox user preferences at
     * [`about:config`](https://support.mozilla.org/en-US/kb/about-config-editor-firefox).
     */
    firefoxUserPrefs?: { [key: string]: string | number | boolean; };

    /**
     * Close the browser process on SIGHUP. Defaults to `true`.
     */
    handleSIGHUP?: boolean;

    /**
     * Close the browser process on Ctrl-C. Defaults to `true`.
     */
    handleSIGINT?: boolean;

    /**
     * Close the browser process on SIGTERM. Defaults to `true`.
     */
    handleSIGTERM?: boolean;

    headless?: boolean;

    ignoreDefaultArgs?: boolean | Array<string>;

    /**
     * Network proxy settings.
     */
    proxy?: {

        server: string;

        /**
         * Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
         */
        bypass?: string;

        /**
         * Optional username to use if HTTP proxy requires authentication.
         */
        username?: string;

        /**
         * Optional password to use if HTTP proxy requires authentication.
         */
        password?: string;
    };

    slowMo?: number;

    timeout?: number;
}

export interface BrowserTypeContract {
    launch(options?: BrowserLaunchOptionsContract): Promise<BrowserContract | any>;
}

export interface BrowserContract extends Browser {
    close(): Promise<any>;
    contexts(): Array<BrowserContextContract>;
    newContext(options?: BrowserContextOptionsContract): Promise<BrowserContextContract>;
    createIncognitoBrowserContext(): Promise<BrowserContextContract>;
}
