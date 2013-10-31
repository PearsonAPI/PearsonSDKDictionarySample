$(function () {
  'use strict';

  var sdk = new Pearson("yc9OJwufExxZmf6b4GdhnRvsdmzxerZB");

  $('#search_form').on('submit', function(e) { 
      e.preventDefault();  
      
      // set the 'global' search criteria
      window.search = { search: $("#search_form #searchbox").val() };
      
      executeSearch(0,25);
  });

 var executeSearch = function (offset,limit) {
    var dict = sdk.dictionaries();    
    var entries = dict.entries();
    var data =  entries.search(search,offset,limit)
    
    var t = ich.template_entries(data);
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
