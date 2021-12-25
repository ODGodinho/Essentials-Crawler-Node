import 'colors';
import Instances from '../../@types/Instances';
import { PageContract } from '../../@types/Page';
import GoogleSelectionHandler from '../Handlers/Selection/GoogleSelectionHandler';
import initInstances from '../Pages/Pages';

class ExampleGoogleCrawlerController {

    public page: PageContract;

    public $i: Instances<PageContract>;

    constructor(page: PageContract) {
        this.page = page;
        this.$i = initInstances(this.page);
    }

    public async exampleSearch(): Promise<void> {
        const GoogleSearch = await this.$i.GoogleSearchPage.start();

        const HandlerSearch = new GoogleSelectionHandler<PageContract>(GoogleSearch);
        await HandlerSearch.start();

        const GoogleSelect = await this.$i.SearchSelectionPage.start();
        console.log("Current Result:".bgCyan.black, GoogleSelect.firstElement);
    }

}

export default ExampleGoogleCrawlerController;