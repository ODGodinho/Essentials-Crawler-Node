import Instances from '../../@types/Instances';
import { PageContract } from '../../@types/Page';
import BasePage from './BasePage';
import GoogleSearchPage from './Search/GoogleSearchPage';
import GoogleSelectionEmptyPage from './Selection/GoogleSelectionEmptyPage';
import GoogleSelectionPage from './Selection/GoogleSelectionPage';

export default function initInstances(page: PageContract): Instances<PageContract> {
    const pages: Instances<PageContract> = {
        GoogleSearchPage: new GoogleSearchPage<PageContract>(page),
        SearchSelectionPage: new GoogleSelectionPage<PageContract>(page),
        GoogleSelectionEmptyPage: new GoogleSelectionEmptyPage<PageContract>(page),
    };
    Object.values(pages).forEach((instance: BasePage<PageContract>) => instance.setInstances(pages));

    return pages;
}
