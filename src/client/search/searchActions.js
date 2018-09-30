import _ from 'lodash';
import { createAsyncActionType } from '../helpers/stateHelpers';
import { getAccountReputation, getAllSearchResultPages } from '../helpers/apiHelpers';

export const SEARCH_DEXPLORER = createAsyncActionType('@search/SEARCH_DEXPLORER');
export const AUTO_COMPLETE_SEARCH = createAsyncActionType('@search/AUTO_COMPLETE_SEARCH');

export const searchDExplorer = search => dispatch =>
  dispatch({
    type: SEARCH_DEXPLORER.ACTION,
    payload: {
      promise: Promise.all([
        getAllSearchResultPages(search)
          .then(response => {
            let mergedResults = [];
            _.each(response, element => {
              mergedResults = _.concat(mergedResults, element.results);
            });
            return _.reverse(_.sortBy(mergedResults, ['type', 'created']));
          })
          .catch(() => []),
        getAccountReputation(search),
      ]),
    },
  });

export const searchAutoComplete = search => dispatch =>
  dispatch({
    type: AUTO_COMPLETE_SEARCH.ACTION,
    payload: {
      promise: getAccountReputation(search).then(result => ({
        result,
        search,
      })),
    },
  });
