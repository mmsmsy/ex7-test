import { changePage } from './components/changePage';
import { changePageSize } from './components/changePage';
import { connectAxios, currentParams } from './components/connectAxios';

$(document).ready( () => connectAxios('http://rt.ex7.pl/get-data', currentParams));

// add changePage function to the buttons
$(".list-control-prev")
  .on("click", () => changePage(-1));

$(".list-control-next")
  .on("click", () => changePage(1));

$(".list-control-first")
  .on("click", () => changePage("first"));

$(".list-control-last")
  .on("click", () => changePage("last"));

$(".page-size-small")
  .on("click", () => changePageSize(100));

$(".page-size-big")
  .on("click", () => changePageSize(1000));