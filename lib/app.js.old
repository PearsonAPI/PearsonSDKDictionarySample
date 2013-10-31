$(function () {
  'use strict';

  var sdk = new Pearson("yc9OJwufExxZmf6b4GdhnRvsdmzxerZB");

  $('#search_form').on('submit', function(e) { 
      e.preventDefault();  
      
      var query = $("#search_form #searchbox").val();
      console.log(query)
 
      var api = sdk.dictionaries();    
      api.addEndpoint('entries');
      api.addParams({limit: 25, offset:0});
      api.addSearch(query);
      executeSearch(api);
  });

 var executeSearch = function (api) {
    var data = $.fetch(api);
    
    var t = ich.template_entries(data.raw());
    $('#entries').html(t);

    $('.panel-collapse').on('show.bs.collapse', function(e) {
      var id = e.target.id;
      var panel = $('#'+id+" .panel-body");
      if ($.trim(panel.html()) == "") {
        console.log("Fetching "+id)
        var api = sdk.dictionaries();    
        api.addEndpoint('entries');
        var data = api.getById(id);
        var t = ich.template_entry(data.result)
        panel.html(t);
      }
    });
 };

});
