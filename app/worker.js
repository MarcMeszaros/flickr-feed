import db from './database.js';
import Dexie from 'dexie';

var SYNC_SECONDS = 60;

// open up the db connection
db.open().catch(function(error) {
    alert('Uh oh : ' + error);
});


// https://developers.google.com/web/fundamentals/getting-started/primers/promises
function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}


function updateDatabase(items) {
    // process each item and add the tweaked image URL
    items.forEach(function(item) {
        item.media.c = item.media.m.replace('_m.', '_c.')
        item.favorited = false;
    });

    // bulk add items
    db.photos.bulkAdd(items).then(function(lastKey) {
        postMessage({action: 'photosAdded', items: items});
    }).catch(Dexie.BulkError, function(e) {
        // Explicitely catching the bulkAdd() operation makes those successful
        // additions commit despite that there were errors.
        var addedCount = (items.length - e.failures.length);
        console.error(`Some photos did not succeed. However, ${addedCount} photos were added successfully.`);
    });
}

// the sync function
var running = true;
function sync() {
    // we use the webpack proxy module to get around CORS
    get('/flickr/public').then(function(response) {
        // substring the response to get rid of the JSONP wrapping
        // ex: "jsonFlickrFeed(.."
        try {
            var sanitized = response.substring(15, response.length-1)
            var data = JSON.parse(sanitized);

            // update the index DB
            updateDatabase(data.items);
        } catch(e) {
            console.error(e); // error in the above string (in this case, yes)!
        }

        // schedule another sync if the running flag is set
        if (running) {
            setTimeout(sync, 1000 * SYNC_SECONDS);
        }
    }, function(error) {
        // handle error
        console.error('Unable to sync Flickr data.');
        if (running) {
            setTimeout(sync, 1000 * SYNC_SECONDS);
        }
    });
}

// handle message from script
onmessage = function(e) {
    if (e.data.action === 'stop') {
        console.log('Sync worker stopped.');
        running = false;
    } else if (e.data.action === 'start') {
        console.log('Sync worker started.');
        running = true;
        sync();
    } else if(e.data.action === 'status') {
        postMessage({
            running: running,
        });
    }
}
