# Flickr Feed

A small web-based Flickr client using the public Flickr JSON feed.

## Details

- Uses this endpoint: https://api.flickr.com/services/feeds/photos_public.gne?format=json
- The client loads and displays pictures and metadata about each picture, scrollable or page-able in some form
- The client is updated with additional de-duplicated content by accessing the feed again every minute
- Allows marking of favorite photos and some sort of mode of the client that displays favorited photos
- Allows un-favoriting of photos

## Development & Running

Can be run/built locally with node.js. A modern browser is also required.

1. Install node.js (6.1.0+)
2. Run `npm install` in shell in root directory
3. Run `npm run serve` to build and serve
4. Browse to `http://localhost:9000/`


# Tests

Unit tests can be run by executing `npm test`.

# Implementation & Caveats
- About 6-7hrs of time spent on this (mostly chasing down webpack/Dexie.js issues)
- The "feed" page uses a web worker to get new photos from the Flickr public feed every 60s
- Photo data is stored in the browser using IndexedDB
- Uses the webpack server to get around CORS limitation (ie. proxy API requests)
- Because this is all browser based, multiple users using a different browser will result in a different list
- Lots of UI polish needed
