import { PageContract } from '../../../@types/Page';
import BaseHandler, { HandlerFunction, HandlerState } from '../BaseHandler';

class GoogleSelectionHandler<PageType extends PageContract> extends BaseHandler<PageType> {

    public identifyHandler(): Promise<HandlerFunction> {
        return Promise.race([
            this.identifySearchComplete(),
            this.identifySearchNotResult(),
        ]);
    }

    public async defaultTimeout(): Promise<number> {
        return 30000;
    }

    private async identifySearchComplete() {
        return this.page.waitForSelector(this.$$s.GoogleSelectionSelector.FIRST_RESULT_ELEMENT, { timeout: await this.defaultTimeout() })
            .then(() => this.resolvedSolution.bind(this));
    }

    private async identifySearchNotResult() {
        return this.page.waitForSelector(this.$$s.GoogleSelectionEmptySelector.NOT_RESULT_ELEMENT, { timeout: await this.defaultTimeout() })
            .then(() => this.newSearchSolution.bind(this));
    }

    private async newSearchSolution() {
        await this.$i.GoogleSelectionEmptyPage.start();
        return HandlerState.VERIFY;
    }

    public async start(): Promise<any> {
        const solution = await this.identifyHandler();
        return this.runSolution(solution);
    }

}

export default GoogleSelectionHandler;
