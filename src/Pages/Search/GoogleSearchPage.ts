import { PageContract } from '../../../@types/Page';
import BasePage from '../BasePage';

class GoogleSearchPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GoogleSearchSelector;

    public async start(): Promise<this> {
        await this.goto();
        await this.fillSearch();
        await this.pressEnter();
        return this;
    }

    public async goto() {
        return this.page.goto(this.$s.GOOGLE_HOME_URL);
    }

    public async fillSearch() {
        const value = (Math.random() + 1).toString(36).substring(2, 18);
        return this.page.type(this.$s.SEARCH_INPUT, value);
    }

    public async pressEnter() {
        return this.page.keyboard.press("Enter");
    }

}

export default GoogleSearchPage;
