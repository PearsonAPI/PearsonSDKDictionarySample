$(function() {
    'use strict';

    var limit = 25;
    var search = {};
    var sdk = new Pearson("yc9OJwufExxZmf6b4GdhnRvsdmzxerZB");
    var dict = sdk.dictionaries();
    console.log("dict =>", dict)
    var entries = dict.entries;
    console.log("Entries => ", entries);

    $('#search_form').on('submit', function(e) {
      e.preventDefault();
      search.search = $('#searchbox').val();
      var data = entries.search(search, 0, limit);
      build_pager(data);
      build_entries(data);
    });

    var build_entries = function(data) {
      var t = ich.template_entries(data);
      $('#entries').html(t);

      $('.panel-collapse').on('show.bs.collapse', function(e) {
        var id = e.target.id;
        var panel = $('#' + id + " .panel-body");
        if ($.trim(panel.html()) == "") {
          var data = entries.getById(id)
          console.log("entry => ",data.result)
          var t = ich.template_entry(data.result)
          panel.html(t);
        }
      });
    }

    var build_pager = function(data) {
      var pages = Math.ceil(data.total / data.limit);
      var html = "<ul class='pagination'>";
      for(var p=0;p<pages;p++) {
        html = html+"<li><a href='#'>"+(p+1)+"</a></li>";
      }
      html = html + "</ul>";
      $('#pagination').html(html);
      $('#pagination a').on('click',function(e) {
        var page = e.target.innerText;
        var data = entries.search(search, limit*(page-1), limit);
        build_pager(data);
        build_entries(data);
      });
    };
  }
);