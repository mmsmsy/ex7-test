import { changePage, changePageSize } from './components/changePage';
import { connectAxios, currentParams } from './components/connectAxios';

$(document).ready( () => connectAxios('http://rt.ex7.pl/get-data', currentParams));

$(".list-control-prev")
  .on("click", () => changePage(-1));
$(".list-control-first")
  .on("click", () => changePage("first"));
$(".list-control-next")
  .on("click", () => changePage(1));
$(".list-control-last")
  .on("click", () => changePage("last"));

$(".page-size-small")
  .on("click", () => changePageSize(100));
$(".page-size-big")
  .on("click", () => changePageSize(1000));