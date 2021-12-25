
import { PageContract } from '../../../@types/Page';
import BasePage from '../BasePage';

export default class GoogleSelectionEmptyPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GoogleSelectionEmptySelector;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.newSearch();
        return this;
    }

    public async newSearch() {
        return this.$i.GoogleSearchPage.start();
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
