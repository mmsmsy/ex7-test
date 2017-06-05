import { currentParams, getParameterByName } from './connectAxios';

let buildResultsList = (data) => {
  // get current parameters from the link and store them
  if (window.location.href.indexOf('?') > 0) {
    currentParams.sort_order = getParameterByName('sort_order');
    currentParams.page = getParameterByName('page');
    currentParams.page_size = getParameterByName('page_size');
    currentParams.filter = getParameterByName('filter');
  }
  
  $('.page-filter-input').val(currentParams.filter);

  let pageSize = parseInt(currentParams.page_size, 10);
  let lastPage;

  pageSize === 100 ? lastPage = 656 : lastPage = 66;
  
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
  if (parseInt(currentParams.page_size) === 100) {
    $('.page-size-small')
      .addClass('inactive');
    $('.page-size-big')
      .removeClass('inactive');
  }
  if (parseInt(currentParams.page_size) === 1000) {
    $('.page-size-big')
      .addClass('inactive');
    $('.page-size-small')
      .removeClass('inactive');
  }

  $('.loading-state').remove();

  currentParams.filter !== '' ?
  $(".list-control-page-num").html("Filtered items page " + currentParams.page) :
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

  $(".results-list > li").addClass("results-list-item");
}

export { buildResultsList }