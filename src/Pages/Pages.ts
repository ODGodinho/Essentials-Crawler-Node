import Instances from '../@types/Instances';
import { PageContract } from '../@types/Page';
import BasePage from './BasePage';

export default function initInstances(_page: PageContract): Instances<PageContract> {
    const pages: Instances<PageContract> = {
    };
    Object.values(pages).forEach((instance: BasePage<PageContract>) => instance.setInstances(pages));

    return pages;
}
