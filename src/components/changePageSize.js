import { connectAxios, currentParams } from './connectAxios';
import { pushHistoryState } from './pushHistoryState';

// login of list control buttons to change the size of the page list
const changePageSize = (amount) => {
  if (amount === parseInt(currentParams.page_size)) return;
  
  let lastPage;

  currentParams.page_size = amount;
  currentParams.page = 1;
    
  pushHistoryState();

  connectAxios("http://rt.ex7.pl/get-data", currentParams);
}

export { changePageSize }