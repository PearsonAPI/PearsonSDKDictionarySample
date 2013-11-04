$(function() {
    'use strict';

    $.support.cors = true;
    
    var limit = 25;
    var search = {};

    // Loadf the Pearson Dicitionaris API
    var dict = Api.dictionaries(); // optional - add your apikey in here
    // Get the Dicitionaries entries endpoint 
    var entries = dict.entries;

    // Simple Handlebars helper to expand URLs returned from the dictionaries into full,
    // usable, URLs (including any apikey specified above)
    Handlebars.registerHelper("expandUrl",function(url) {
      return dict.expandUrl(url);
    });

    // When the user submits the search form, get the search parameters and execute a 
    // search against the Dicitionaries API
    $('#search_form').on('submit', function(e) {
      e.preventDefault();

      // We want to search on 'headword's, so we specifiy the 'headword' property on the search
      // object. This can easily be replaced with any valid search parameter (ie 'search', 'synonyms',
      // 'part_of_speech'), or suplimentd with additional search parameters.
      search.headword = $('#searchbox').val();

      // Limit the datasets that the search should cover (if specified)
      var datasets = "";
      $('#datasets :checked').each(function() {
        datasets = datasets+","+this.value;
      });
      entries.setDatasets(datasets);

      // Search the API 
      var data = entries.search(search, 0, limit);

      // Use search results to build the 'pager'
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
          console.log("Entry => ",data)
          var t = ich.template_entry(data.result)
          panel.html(t);
          // Make the audio files play
          $('.audio span').on('click',function(e) {
            e.target.firstElementChild.play();
          });
        }
      });
    }

    var build_pager = function(data) {
      var pages = Math.ceil(data.total / data.limit);
      var html = "<p>Found "+ data.total+ " entries.</p>"
      if (pages > 0) {
        html = html+"<ul class='pagination'>";
        for(var p=0;p<pages;p++) {
         html = html+"<li><a href='#'>"+(p+1)+"</a></li>";
        }
        html = html + "</ul>";
      }
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