import Instances from '../../@types/Instances';
import { PageContract } from '../../@types/Page';
import SelectorsType from '../../@types/Selectors';
import BasePage from '../Pages/BasePage';

export enum HandlerState {
    VERIFY = 0, // use to check handler again
    COMPLETED = 1, // use if handler is completed
}

export type HandlerFunction = () => Promise<HandlerState>;

abstract class BaseHandler<PageType extends PageContract> {

    public readonly basePage: BasePage<PageType>;

    public readonly page: PageType;

    public readonly $i: Instances<PageType>;

    public readonly $$s: SelectorsType;

    constructor(page: BasePage<PageType>) {
        this.basePage = page;
        this.$i = page.$i;
        this.$$s = page.$$s;
        this.page = page.page;
    }

    public abstract identifyHandler(): Promise<HandlerFunction>;

    public abstract start(): Promise<this>;

    public abstract defaultTimeout(): Promise<number>;

    public async resolvedSolution() {
        return HandlerState.COMPLETED;
    }

    public async runSolution(solution: HandlerFunction) {
        if (typeof solution === "function") {
            return solution().then(async (resolved: HandlerState) => {
                if (resolved === HandlerState.VERIFY) {
                    const solved = await this.start();
                    return solved;
                }
                return resolved;
            });
        }
        throw new Error("Error: Solution is not a function");
    }
}

export default BaseHandler;
