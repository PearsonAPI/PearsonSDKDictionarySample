PearsonAPI Dictionary Sample
============================

This sample is provided to show a simple (and limited) use-case of the Pearson API SDK for
Javascript.

### About the sample
This is a simple sample, and not a full-blown application. It demonstrates the simple use of the Pearson SDK using the Dictionary API to search for and retrieve data from the [Dictionary API](http://developer.pearson.com/apis/dictionaries).

The sample utilizes a simple search form providing a 'headword' search on entries in the dictionaries. This can be modified in the ```lib/app.js``` file to either change or extend the search to work against other search criteria.

The sample app makes use of _handlebars_ as a simple template language. The _ICanHandlbars_ package is used to to allow templates to be defined as a single page application. We use _bootstrap_ to provide the page components, and _jQuery_ to orchestrate. And of course, the Pearson API SDK :-)

### Running the Sample

Edit the ```lib\app.js``` file to add your production key into the source (if you have/need one). Then simply serve the file ```index.html``` through a web server.