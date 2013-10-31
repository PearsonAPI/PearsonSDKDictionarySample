$(function () {
  'use strict';

  var search = {}
  var sdk = new Pearson("yc9OJwufExxZmf6b4GdhnRvsdmzxerZB");
  var entries = sdk.dictionaries().entries;
  console.log("Entries => ",entries);

  $('#search_form').on('submit', function(e) { 
      e.preventDefault();  
      search.search = $('#searchbox').val();
      executeSearch(0,25);
  });

 var executeSearch = function (offset,limit) {
    var data =  entries.search(search,offset,limit)
    
    var t = ich.template_entries(data);
    $('#entries').html(t);

    $('.panel-collapse').on('show.bs.collapse', function(e) {
      var id = e.target.id;
      var panel = $('#'+id+" .panel-body");
      if ($.trim(panel.html()) == "") {
        console.log("Fetching "+id)
        var data = entries.getById(id)
        var t = ich.template_entry(data.result)
        panel.html(t);
      }
    });
 };

});
