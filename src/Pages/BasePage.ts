import Instances from '../../@types/Instances';
import { PageContract } from '../../@types/Page';
import SelectorsType from '../../@types/Selectors';
import Selectors from '../Selectors/Selectors';

abstract class BasePage<PageType extends PageContract> {

    public readonly page: PageType;

    public readonly $$s = Selectors;

    public readonly abstract $s: SelectorsType[keyof SelectorsType];

    private instancesData?: Instances<PageType>

    constructor(page: PageType) {
        this.page = page;
    }

    public abstract start(): Promise<this>;

    public async goBack(options?: any) {
        return this.page.goBack(options);
    }

    public setInstances(instances: Instances<PageType>) {
        this.instancesData = instances;
    }

    public get $i(): Instances<PageType> {
        if (!this.instancesData) throw new Error("No instances data available");

        return this.instancesData;
    }
}

export default BasePage;
