# Flickr Feed

A small web-based Flickr client using the public Flickr JSON feed.

## Details

- Uses this endpoint: https://api.flickr.com/services/feeds/photos_public.gne?format=json
- The client loads and displays pictures and metadata about each picture, scrollable or page-able in some form
- The client is updated with additional de-duplicated content by accessing the feed again every minute
- Allows marking of favorite photos and some sort of mode of the client that displays favorited photos
- Allows un-favoriting of photos

## Development & Running

Can be run/built locally with node.js.

1. Install node.js (6.1.0+)
2. Run `npm install` in shell in root directory
3. Run `npm run serve` to build and serve
4. Browse to `http://localhost:9000/`


# Tests

Unit tests can be run by executing `npm test`.
