import buildResultsList from './components/buildResultsList';
import changePage from './components/changePage';
import changePageSize from './components/changePage';
import connectAjax from './components/connectAjax';

let currentParams = ["sort_order=asc", "page=1", "page_size=100", "filter="];

$(document).ready(function() {
  connectAjax('http://rt.ex7.pl/get-data', buildResultsList, currentParams);
});

// add changePage function to the buttons
$(".list-control-prev")
  .on("click", function() {
    changePage(-1);
  });

$(".list-control-next")
  .on("click", function() {
    changePage(1);
  });

$(".list-control-first")
  .on("click", function() {
    changePage("first");
  });

$(".list-control-last")
  .on("click", function() {
    changePage("last");
  });

$(".page-size-small")
  .on("click", function() {
    changePageSize(100);
  });

$(".page-size-big")
  .on("click", function() {
    changePageSize(1000);
  });