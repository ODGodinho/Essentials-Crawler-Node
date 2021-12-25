import { PageContract } from '../../../@types/Page';
import BasePage from '../BasePage';

class GoogleSelectionPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GoogleSelectionSelector;

    public firstElement?: string;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.loadTextResult();
        return this;
    }

    public async loadTextResult() {
        this.firstElement = await this.page.$eval(this.$s.FIRST_RESULT_ELEMENT, (el: Element) => el.innerHTML);
    }

}

export default GoogleSelectionPage;