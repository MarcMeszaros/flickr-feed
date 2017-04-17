import db from '../database.js';

var ITEMS_PER_PAGE = 20;


export default {
    name: 'Feed',
    data() {
        return {
            photos: [],
            photosAdded: [],
            photosCount: 0,
        }
    },
    computed: {
        numberOfPages: function() {
            return Math.ceil(this.$data.photosCount / ITEMS_PER_PAGE);
        }
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    created() {
        var self = this;
        // Open the database
        db.open().catch(function(error) {
            alert('Uh oh : ' + error);
        });

        db.photos.count().then(function(response) {
            self.$set(self.$data, 'photosCount', response);
        });

        // start the sync worker
        self.syncWorker = new Worker('/worker.full.js');
        self.syncWorker.onmessage = function(e) {
            console.log('Worker message received.');
            if (e.data.action === 'photosAdded') {
                // update the photosAdded array
                self.$set(self.$data, 'photosAdded', self.$data.photosAdded.concat(e.data.items));
            }
        };
    },
    mounted() {
        var self = this;
        self.syncWorker.postMessage({action: 'start'});
        // update the photos count
        db.photos.count().then(function(response) {
            self.$set(self.$data, 'photosCount', response);
        });

        // get all favorited photos from storage
        var offset = (this.$route.params.page - 1) * ITEMS_PER_PAGE;
        db.photos
            .reverse()
            .offset(offset)
            .limit(ITEMS_PER_PAGE)
            .each(function(photo, cursor) {
                photo.id = cursor.primaryKey;
                self.$data.photos.push(photo);
            });
    },
    beforeDestroyed() {
        var self = this;
        self.syncWorker.postMessage({action: 'start'});
    },
    methods: {
        fetchData: function() {
            var self = this;
            // get all favorited photos from storage
            var offset = (self.$route.params.page - 1) * ITEMS_PER_PAGE;
            self.$set(self.$data, 'photos', []);
            db.photos
                .reverse()
                .offset(offset)
                .limit(ITEMS_PER_PAGE)
                .each(function(photo, cursor) {
                    photo.id = cursor.primaryKey;
                    self.$data.photos.push(photo);
                });
        },
        favoriteToggle: function(index) {
            var self = this;
            var favorited = this.$data.photos[index].favorited || false;
            favorited = (favorited) ? false : true;
            db.photos.update(self.$data.photos[index].id, {'favorited': favorited}).then(function(updated) {
                if (updated) {
                    self.$data.photos[index].favorited = favorited;
                }
            });
        },
        mergeAddedPhotos: function() {
            this.$set(this.$data, 'photos', this.$data.photosAdded.reverse().concat(this.$data.photos));
            this.$set(this.$data, 'photosAdded', []);
        },
        getTags: function(photo) {
            return photo.tags.split(' ');
        },
        pageChange: function(page) {
            this.$router.push({ name: 'feed', params: { page: page }});
        }
    },
};
