import { changePage } from './components/changePage';
import { changePageSize } from './components/changePageSize';
import { pushHistoryState } from './components/pushHistoryState';
import { connectAxios, currentParams } from './components/connectAxios';
import { filterPage, clearFilter } from './components/filterPage';
import { sortOrder } from './components/sortOrder.js';

// build list when website opened based on passed parameters
$(document).ready( () => connectAxios('http://rt.ex7.pl/get-data', currentParams));

currentParams.filter !== '' ? $('.page-filter-input').val(currentParams.filter) : currentParams.filter;

pushHistoryState();

// build new list if back/forward browser button pressed
window.onpopstate = (event) => connectAxios('http://rt.ex7.pl/get-data', event.state);

// add click actions to all buttons
$(".list-control-prev").on("click", () => changePage(-1));
$(".list-control-first").on("click", () => changePage("first"));
$(".list-control-next").on("click", () => changePage(1));
$(".list-control-last").on("click", () => changePage("last"));

$(".page-size-small").on("click", () => changePageSize(100));
$(".page-size-big").on("click", () => changePageSize(1000));

$(".page-filter-input").on("input", () => filterPage());
$(".page-filter-button").on("click", () => clearFilter());

$(".page-sort-asc").on("click", () => sortOrder('asc'));
$(".page-sort-desc").on("click", () => sortOrder('desc'));

$(".page-top-button").on("click", () => $(window.opera ? 'html' : 'html, body').animate({scrollTop: 0}, 'slow'));