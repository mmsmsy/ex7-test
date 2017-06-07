import { connectAxios, currentParams } from './connectAxios';
import { pushHistoryState } from './pushHistoryState';

// logic of list control buttons to change pages
const changePage = (addition) => {
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

  currentParams.page = newPage;
  
  pushHistoryState();
  
  connectAxios("http://rt.ex7.pl/get-data", currentParams);
}

export { changePage }