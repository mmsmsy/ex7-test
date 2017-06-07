import { currentParams, connectAxios } from './connectAxios';
import { pushHistoryState } from './pushHistoryState';

const sortOrder = (selectedOrder) => {
  if (selectedOrder === currentParams.sort_oder) return;

  currentParams.sort_order = selectedOrder;

  pushHistoryState();

  connectAxios("http://rt.ex7.pl/get-data", currentParams);
}

export { sortOrder }