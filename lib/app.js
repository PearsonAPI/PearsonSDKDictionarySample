$(function () {
  'use strict';

  // setup elastic.js client for jQuery
  ejs.client = ejs.jQueryClient('http://ec2-54-216-113-14.eu-west-1.compute.amazonaws.com:9200');

  $('#searchbox').keypress(function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      var query = $('#searchbox').val();
      console.log(query)
      executeSearch(ejs.Request({indices: 'pearson', types: 'recipe'}),query,9);  
      executeSearch(ejs.Request({indices: 'pearson', types: 'image'}),query,9);  
      executeSearch(ejs.Request({indices: 'pearson', types: 'place'}),query,9);  
      executeSearch(ejs.Request({indices: 'pearson', types: 'book'}),query,9);  
    }
  });

 // var request = ejs.Request({indices: 'pearson', types: 'book'});

 var executeSearch = function (request,qstr,size) {
    $('.card').remove()
    $('.category-header').hide()
    request.query(ejs.QueryStringQuery(qstr || '*'))
    .size(size)
    .fields(["title","url","authors","id","name","title","caption","filename","thumb","location"])
    .doSearch(handleResults)};


 var handleResults = function(results) {
    
     var hits = results.hits;
     var total = hits.total;
     console.log(hits)
     for (var i=0;i< (hits.hits.length);i++ ) {
        var hit = hits.hits[i];
        
        if (hit._type == "recipe") {
          $('#recipes').show()
          addRecipe(hit)
        } else if (hit._type == "image") {
          $('#images').show()
          addImage(hit)
        } else if (hit._type == "place") {
          $('#places').show()
          addPlace(hit)
         } else if (hit._type == "book") {
          $('#books').show()
          addBook(hit)
        }
     }
 };

  var addRecipe = function(recipe) {
    var data = { id: recipe._id,
                 title: recipe.fields.name,
                 url: fixUrl(recipe.fields.url),
                 desc: recipe.fields.cuisine,
                 thumb: fixUrl(recipe.fields.thumb),
                 score: recipe._score
                }
            var t = ich.tmpl_card(data)
            $('#recipes').append(t)
  };
  
  var addImage = function(image) {
      var data = { id: image._id,
        title: image.fields.filename,
                         url: fixUrl(image.fields.url),
                         desc: image.fields.caption,
                         thumb: fixUrl(image.fields.url),
                         score: image._score
                       }
            var t = ich.tmpl_card(data)
            $('#images').append(t)
  }
  
    var addBook = function(book) {
      var data = { id: book._id,
                  title: book.fields.title[0],
                  url: fixUrl(book.fields.url),
                  desc: book.fields.authors,
                  thumb: "img/icon-book.png",
                  score: book._score
                       }
                       console.log("Book data",data)
            var t = ich.tmpl_card(data)
            $('#books').append(t)
  }


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

  var genMap = function(place) {
    if (place.fields.location == null) {
      return "http://maps.googleapis.com/maps/api/staticmap?zoom=13&sensor=false&center=37.762988,-122.434591&markers=color:blue|37.762988,-122.434591&size=135x135";
    } else {
      var url = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&sensor=false";
      url += "&center="+place.fields.location.lat+","+place.fields.location.lon;
      url += "&markers=color:blue|"+place.fields.location.lat+","+place.fields.location.lon;
      return url;
    }
  }

  var fixUrl = function(url) {
    console.log(url)
    if (url) {
      var fix = url.match(/^(.*)\?.*$/)
      if (fix && fix[1]) {
        return fix[1]+"?apikey=9b7305c0523c3902ec01b44e5a5c53ad";  
      } else {
        return url+"?apikey=9b7305c0523c3902ec01b44e5a5c53ad";  
      }
    } else {
      return "";
    }
  };
});
