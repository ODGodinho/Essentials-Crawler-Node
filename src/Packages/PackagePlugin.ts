import { BrowserTypeContract } from '../@types/Browser';
import { PageContract } from '../@types/Page';
import Context from '../Context/Context';

export interface onNewPageCallback {
    callback: Function;
    params: any;
}

export interface PackagePluginInterface {
    onNewPage?: (_context?: Context<BrowserTypeContract<PageContract>, PageContract>) => Promise<onNewPageCallback|void>;
}

abstract class PackagePlugin implements PackagePluginInterface {

}

export default PackagePlugin;