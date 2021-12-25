import GoogleSearchPage from '../src/Pages/Search/GoogleSearchPage';
import SearchSelectionPage from '../src/Pages/Selection/GoogleSelectionPage';
import GoogleSelectionEmptyPage from '../src/Pages/Selection/GoogleSelectionEmptyPage';
import { PageContract } from './Page';

export default interface Instances<PageType extends PageContract> {
    GoogleSearchPage: GoogleSearchPage<PageType>;
    SearchSelectionPage: SearchSelectionPage<PageType>;
    GoogleSelectionEmptyPage: GoogleSelectionEmptyPage<PageType>;
}