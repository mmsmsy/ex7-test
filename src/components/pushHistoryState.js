import { currentParams } from './connectAxios';

// push initial state to the browser history with current parameters
let pushHistoryState = () => {
  let objState = {
    sort_order: currentParams.sort_order,
    page: currentParams.page,
    page_size: currentParams.page_size,
    filter: currentParams.filter
  };
  history.pushState(objState, null, '?' + jQuery.param(currentParams));
}

export { pushHistoryState }