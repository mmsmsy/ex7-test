import { connectAxios, currentParams } from './connectAxios';

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

// logic of list control buttons to change pages
let changePage = (addition) => {
  let currentPage = parseInt(currentParams.page, 10);
  let pageSize = parseInt(currentParams.page_size, 10);
  let newPage, lastPage;

  // determine what number is the last page based on the page size
  pageSize === 100 ? lastPage = 656 : lastPage = 66;

  // check if it's a call from first/last page buttons
  if (typeof addition === "string") {
    if (addition === "first") {
      if (currentPage === 1) return;
      newPage = 1;
    }
    else if (addition === "last") {
      if (currentPage === lastPage) return;
      newPage = lastPage;
    }
  }
  // if it's not then it's a call from prev/next page buttons, so determine what should be the following page
  else {
    if (currentPage <= 1) {
      if (addition < 0) return;
      newPage = currentPage + addition;
    }
    else if (currentPage >= lastPage) {
      if (addition > 0) return;
      newPage = currentPage + addition;
    }
    else newPage = currentPage + addition;
  }

  if (newPage <= 1) {
    $(".list-control-prev")
      .addClass("inactive")
    $(".list-control-first")
      .addClass("inactive")
    $(".list-control-next")
      .removeClass("inactive")
    $(".list-control-last")
      .removeClass("inactive")
  }
  else if (newPage >= lastPage) {
    $(".list-control-next")
      .addClass("inactive")
    $(".list-control-last")
      .addClass("inactive")
    $(".list-control-prev")
      .removeClass("inactive")
    $(".list-control-first")
      .removeClass("inactive")
  }
  else {
    $(".list-control-prev")
      .removeClass("inactive")
    $(".list-control-first")
      .removeClass("inactive")
    $(".list-control-next")
      .removeClass("inactive")
    $(".list-control-last")
      .removeClass("inactive")
  }

  currentParams.page = newPage;
  
  pushHistoryState();
  
  connectAxios("http://rt.ex7.pl/get-data", currentParams);
  $(".list-control-page-num").html("Page " + newPage + "/" + lastPage);
}

// login of list control buttons to change the size of the page list
let changePageSize = (amount) => {
  let lastPage;

  amount === 100 ? lastPage = 656 : lastPage = 66;
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
  $(".list-control-page-num").html("Page 1/" + lastPage);
}

export { changePage, changePageSize, pushHistoryState }