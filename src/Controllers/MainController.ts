import 'colors';
import Instances from '../@types/Instances';
import { PageContract } from '../@types/Page';
import initInstances from '../Pages/Pages';

class MainController {

    public page: PageContract;

    public $i: Instances<PageContract>;

    constructor(page: PageContract) {
        this.page = page;
        this.$i = initInstances(this.page);
    }

    public async start(): Promise<void> {
        await this.page.goto("https://google.com/", { waitUntil: "commit" });
        console.log(await this.page.evaluate("navigator.webdriver"));
    }

}

export default MainController;