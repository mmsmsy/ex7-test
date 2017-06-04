import axios from 'axios';
import { buildResultsList } from './buildResultsList';

// function to extract parameters from the link
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// default parameters if none specified in the link
let currentParams = {
  sort_order: 'asc',
  page: 1,
  page_size: 100,
  filter: ''
}

// read parameters when website opened and store them as current parameters
if (window.location.href.indexOf('?') > 0) {
  currentParams.sort_order = getParameterByName('sort_order');
  currentParams.page = getParameterByName('page');
  currentParams.page_size = getParameterByName('page_size');
  currentParams.filter = getParameterByName('filter');
}

// function to request data from the server and build the list based on the data received
let connectAxios = (url, urlParams) => {
  url += '?' + jQuery.param(urlParams);

  axios.post(url)
    .then(res => res.data)
    .then(data => buildResultsList(data))
}

export { currentParams, connectAxios, getParameterByName }