import { currentParams, getParameterByName } from './connectAxios';

let buildResultsList = (data) => {
  // get current parameters from the link and store them
  if (window.location.href.indexOf('?') > 0) {
    currentParams.sort_order = getParameterByName('sort_order');
    currentParams.page = getParameterByName('page');
    currentParams.page_size = getParameterByName('page_size');
    currentParams.filter = getParameterByName('filter');
  }
  
  $(".results-list").remove(); // make sure previous list is removed for the new one to appear in place

  let pageSize = parseInt(currentParams.page_size, 10);
  let lastPage;

  pageSize === 100 ? lastPage = 656 : lastPage = 66;

  $(".list-control-page-num").html("Page " + currentParams.page + "/" + lastPage);
  
  jQuery("<ul/>", {
    class: "results-list"
  }).appendTo('#root');

  data.map(item => {
    var listItem = document.createElement("li");
    listItem.innerHTML =
      "<span class='name'>"
      + item.name
      + "</span><span class='acronym'>Acronym: "
      + item.acronym
      + "</span><span class='id'>ID: "
      + item.id
      + "</span>";
    
    return $(".results-list").append(listItem);
  });

  $(".results-list > li")
    .addClass("results-list-item")
  
  if (parseInt(currentParams.page) === 1) {
    $(".list-control-prev")
      .addClass("inactive")
    $(".list-control-first")
      .addClass("inactive")
  }
  if (parseInt(currentParams.page) === lastPage) {
    $(".list-control-next")
      .addClass("inactive")
    $(".list-control-last")
      .addClass("inactive")
  }
}

export { buildResultsList }