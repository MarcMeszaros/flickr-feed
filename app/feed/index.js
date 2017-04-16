import db from './database.js';

export default {
    name: 'Feed',
    data() {
        return {
            photos: [],
        }
    },
    created() {
        var self = this;
        // Open the database
        db.open().catch(function(error) {
            alert('Uh oh : ' + error);
        });

        // Find some photos
        db.photos
            .each(function(photo) {
                self.$data.photos.push(photo);
            });


        // the callback
        window.jsonFlickrFeed = function(d) {
            d.items.forEach(function(item) {
                item.media.c = item.media.m.replace('_m.', '_c.')
                db.photos.add(item);
            });
        };

        this.$http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json');
    },
};
