import { currentParams, connectAxios } from './connectAxios';
import { pushHistoryState } from './pushHistoryState';

const filterPage = () => {
  const letters = /^[0-9a-zA-Z-\s]+$/;
  let filterValue = $('.page-filter-input').val();

  if (filterValue !== '') {
    // accept only alphanumeric values and spaces, but don't include them into filter parameter
    if(filterValue.match(letters)) {
      filterValue = filterValue
        .toLowerCase()
        .replace(/ /g,"");
      currentParams.filter = filterValue;
      currentParams.page = 1;

      pushHistoryState();

      connectAxios("http://rt.ex7.pl/get-data", currentParams);
    }  
    else {
      alert('Please input alphanumeric characters only');
      $('.page-filter-input').val($('.page-filter-input').val().slice(0, -1));
    }
  }
  else {
    currentParams.filter = filterValue;
    currentParams.page = 1;

    pushHistoryState();

    connectAxios("http://rt.ex7.pl/get-data", currentParams);
  }
  
}

const clearFilter = () => {
  if (currentParams.filter === '') return;
  $('.page-filter-input').val('');
  filterPage();
}

export { filterPage, clearFilter }