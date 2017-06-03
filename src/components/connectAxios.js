import axios from 'axios';
import { buildResultsList } from './buildResultsList';

let currentParams = ["sort_order=asc", "page=1", "page_size=100", "filter="];

let connectAxios = (url, urlParams) => {
  for (let i = 0; i < urlParams.length; i++) {
    currentParams = urlParams;
    i === 0 ? url += "?" + urlParams[0] : url += "&" + urlParams[i];
  }

  axios.post(url)
    .then(res => res.data)
    .then(data => buildResultsList(data))
}

export { currentParams, connectAxios }