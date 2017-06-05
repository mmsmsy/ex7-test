import { currentParams, connectAxios } from './connectAxios';
import { pushHistoryState } from './pushHistoryState';

let filterPage = () => {
  currentParams.filter = $('.page-filter-input').val();
  currentParams.page = 1;

  connectAxios("http://rt.ex7.pl/get-data", currentParams);
  $(".list-control-page-num").html("Filtered items page " + currentParams.page);

  pushHistoryState();
}

let clearFilter = () => {
  $('.page-filter-input').val('');
  filterPage();
}

export { filterPage, clearFilter }