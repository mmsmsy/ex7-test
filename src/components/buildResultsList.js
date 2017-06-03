export let buildResultsList = (data) => {
  // make sure previous list is removed for the new one to appear in place
  $(".results-list").remove();

  // Print which page you're at along with the info how many pages there are
  var pageSize = parseInt(currentParams[2]
      .slice(currentParams[2]
      .indexOf("=")+1));
  var lastPage;
  if (pageSize === 100) lastPage = 656;
  else lastPage = 66;
  $(".list-control-page-num").html("Page " + currentParams[1].slice(currentParams[1].indexOf("=")+1) + "/" + lastPage);
  
  // create a list and append it to root element in the HTML file
  jQuery("<ul/>", {
    class: "results-list"
  }).appendTo('#root');

  // create list items from the data property and append them to the list
  data.map(function(item) {
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

  // add a class to all list items
  $(".results-list > li")
    .addClass("results-list-item")
}