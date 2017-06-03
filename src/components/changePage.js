import { connectAxios, currentParams } from './connectAxios';

// logic of list control buttons to change pages
let changePage = (addition) => {
    // we extract the current page number and the page size from currentParams global variable that is passed to the AJAX call
    let currentPage = parseInt(currentParams[1]
      .slice(currentParams[1]
      .indexOf("=")+1));
    let pageSize = parseInt(currentParams[2]
      .slice(currentParams[2]
      .indexOf("=")+1));
    let newPage, lastPage;

    // determine what number is the last page based on the page size
    if (pageSize === 100) lastPage = 656;
    else if (pageSize === 1000) lastPage = 66;

    // check if it's a call from first/last page buttons
    if (typeof addition === "string") {
      if (addition === "first") {
        currentParams[1] = currentParams[1]
          .slice(0, 5)
          .concat(1);

        connectAxios("http://rt.ex7.pl/get-data", currentParams);
        $(".list-control-page-num").html("Page 1/" + lastPage);

        return;
      }
      else if (addition === "last") {
        newPage = lastPage;

        currentParams[1] = currentParams[1]
          .slice(0, 5)
          .concat(newPage);

        connectAxios("http://rt.ex7.pl/get-data", currentParams);
        $(".list-control-page-num").html("Page " + newPage + "/" + lastPage);

        return;
      }
    }

    // if it's not then it's a call from prev/next page buttons, so determine what should be the following page
    if (currentPage <= 1) {
      if (addition < 0) newPage = lastPage;
      else newPage = currentPage + addition;
    }
    else if (currentPage >= lastPage) {
      if (addition > 0) newPage = 1;
      else newPage = currentPage + addition;
    }
    else newPage = currentPage + addition;

    currentParams[1] = currentParams[1]
      .slice(0, 5)
      .concat(newPage);
    
    connectAxios("http://rt.ex7.pl/get-data", currentParams);
    $(".list-control-page-num").html("Page " + newPage + "/" + lastPage);
}

let changePageSize = (amount) => {
  let lastPage;

  if (amount === 100) lastPage = 656;
  else lastPage = 66;

  currentParams[2] = currentParams[2]
    .slice(0, 10)
    .concat(amount);

  currentParams[1] = currentParams[1]
    .slice(0, 5)
    .concat(1);

  connectAxios("http://rt.ex7.pl/get-data", currentParams);
  $(".list-control-page-num").html("Page 1/" + lastPage);
}

export { changePage, changePageSize }