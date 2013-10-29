$(function () {
  'use strict';

  $('#search_form').on('submit', function(e) { 
      e.preventDefault();  
      
      var query = $("#search_form #searchbox").val();
      console.log(query)

      var sdk = new Pearson("yc9OJwufExxZmf6b4GdhnRvsdmzxerZB");
      var api = sdk.api("dictionaries");
      api.addEndpoint('entries');
      api.addParams({limit: 25, offset:0});
      api.addSearch(query);
      executeSearch(api);
  });

 var executeSearch = function (api) {
    // $('.card').remove()
    // $('.category-header').hide()
    var data = $.fetch(api);
    data = data.raw();
    
    console.log(data);

    var t = ich.template_entries(data);
    $('#entries').html(t);
 };

});
