export let connectAjax = (url, callback, params) => {
  function updateUrlParams(urlParams) {
    for (var i = 0; i < urlParams.length; i++) {
      currentParams = urlParams;
      i === 0 ? url += "?" + urlParams[0] : url += "&" + urlParams[i];
    }
  }
  
  updateUrlParams(params);

  $.post( url, function(data) {
    callback(data)
  });
}