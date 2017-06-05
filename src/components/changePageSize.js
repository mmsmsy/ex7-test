import { connectAxios, currentParams } from './connectAxios';
import { pushHistoryState } from './pushHistoryState';

// login of list control buttons to change the size of the page list
let changePageSize = (amount) => {
  if (amount === parseInt(currentParams.page_size)) return;
  
  let lastPage;

  if (amount === 100) {
    lastPage = 656;
    $('.page-size-small')
      .addClass('inactive');
    $('.page-size-big')
      .removeClass('inactive');
  }
  else {
    lastPage = 66;
    $('.page-size-big')
      .addClass('inactive');
    $('.page-size-small')
      .removeClass('inactive');
  }

  currentParams.page_size = amount;
  currentParams.page = 1;
  
  $(".list-control-prev")
    .addClass("inactive")
  $(".list-control-first")
    .addClass("inactive")
  $(".list-control-next")
    .removeClass("inactive")
  $(".list-control-last")
    .removeClass("inactive")
    
  pushHistoryState();

  connectAxios("http://rt.ex7.pl/get-data", currentParams);
  currentParams.filter !== '' ?
  $(".list-control-page-num").html("Filtered items page " + currentParams.page) :
  $(".list-control-page-num").html("Page " + currentParams.page + "/" + lastPage);
}

export { changePageSize }