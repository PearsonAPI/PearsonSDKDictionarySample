$(function () {
  'use strict';


  $('#searchbox').keypress(function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      var query = $('#searchbox').val();
      console.log(query)

      var sdk = new Pearson("yc9OJwufExxZmf6b4GdhnRvsdmzxerZB");
      var api = sdk.api("dictionaries");
      api.addEndpoint('entries');
      api.addParams({limit: 25, offset:0});
      api.addSearch(query);
      executeSearch(api);
    }
  });

 var executeSearch = function (api) {
    // $('.card').remove()
    // $('.category-header').hide()
    var data = $.fetch(api);
    data = data.raw();
    
    console.log(data);

    var t = ich.template_entries(data);
    $('#entries').append(t);
    // var handleResults = function(results) {
    
    //  var hits = results.hits;
    //  var total = hits.total;
    //  console.log(hits)
    //  for (var i=0;i< (hits.hits.length);i++ ) {
    //     var hit = hits.hits[i];
        
    //     if (hit._type == "recipe") {
    //       $('#recipes').show()
    //       addRecipe(hit)
    //     } else if (hit._type == "image") {
    //       $('#images').show()
    //       addImage(hit)
    //     } else if (hit._type == "place") {
    //       $('#places').show()
    //       addPlace(hit)
    //      } else if (hit._type == "book") {
    //       $('#books').show()
    //       addBook(hit)
    //     }
    //  }
 };

  var addPlace = function(place) {
    var thumb = genMap(place)
    var thumbLink = thumb
    if (thumb != "") {
      thumb = thumb + "&size=135x135"
      thumbLink = thumbLink + "&size=800x640"
    }
    
      var data = { id: place._id,
        title: place.fields.title,
                         url: fixUrl("https://heimdall.pearson.com"+place.fields.url),
                         desc: place.fields.address,
                         thumb: thumb,
                         thumb_link: thumbLink,
                         score: place._score
                       }
            var t = ich.tmpl_card(data)
            $('#places').append(t)
  }

});
