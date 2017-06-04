import { currentParams, connectAxios } from './connectAxios';
import { pushHistoryState } from './changePage';

let filterPage = () => {
  currentParams.filter = $('.page-filter-input').val();
  currentParams.page = 1;
  currentParams.page_size = 1000;

  connectAxios("http://rt.ex7.pl/get-data", currentParams);
  $(".list-control-page-num").html("Filtered items");

  pushHistoryState();
}

export { filterPage }