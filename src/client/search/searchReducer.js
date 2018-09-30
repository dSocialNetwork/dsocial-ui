import _ from 'lodash';
import * as searchActions from './searchActions';
import formatter from '../helpers/dpayFormatter';

const initialState = {
  loading: true,
  searchError: false,
  searchResults: [],
  autoCompleteSearchResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchActions.SEARCH_DEXPLORER.START:
      return {
        ...state,
        loading: true,
        searchError: false,
      };
    case searchActions.SEARCH_DEXPLORER.SUCCESS: {
      const dExploreResults = _.get(action.payload, 0, []);
      const dpayLookupResults = _.get(action.payload, 1, []);
      const parsedDPayLookupResults = _.map(dpayLookupResults, accountDetails => ({
        ...accountDetails,
        reputation: formatter.reputation(accountDetails.reputation),
        name: accountDetails.account,
        type: 'user',
      }));
      const sortedDExplorerLookupResults = _.sortBy(parsedDExplorerLookupResults, 'reputation').reverse();
      const searchResults = _.compact(_.concat(sortedDPayLookupResults, dExploreResults));
      return {
        ...state,
        searchResults,
        loading: false,
      };
    }
    case searchActions.SEARCH_DEXPLORER.ERROR:
      return {
        ...state,
        searchResults: [],
        loading: false,
        searchError: true,
      };
    case searchActions.AUTO_COMPLETE_SEARCH.SUCCESS: {
      const { result, search } = action.payload;
      const parsedResults = _.map(result, account => ({
        ...account,
        reputation: formatter.reputation(account.reputation),
      }));
      const sortedResults = _.compact(
        _.slice(
          _.map(
            _.sortBy(parsedResults, 'reputation').reverse(),
            accountDetails => accountDetails.account,
          ),
          0,
          5,
        ),
      );
      return {
        ...state,
        autoCompleteSearchResults: _.isEmpty(search) ? [] : sortedResults,
      };
    }
    default:
      return state;
  }
};

export const getSearchLoading = state => state.loading;
export const getSearchResults = state => state.searchResults;
export const getAutoCompleteSearchResults = state => state.autoCompleteSearchResults;
