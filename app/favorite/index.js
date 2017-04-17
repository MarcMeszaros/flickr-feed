import db from '../database.js';

var ITEMS_PER_PAGE = 20;


export default {
    name: 'Feed',
    data() {
        return {
            photos: [],
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

        db.photos.filter(function (photo) {
            return photo.favorited === true;
        }).count().then(function(response) {
            self.$set(self.$data, 'photosCount', response);
        });
    },
    mounted() {
        var self = this;
        db.photos.filter(function (photo) {
            return photo.favorited === true;
        }).count().then(function(response) {
            self.$set(self.$data, 'photosCount', response);
        });

        // Find some photos
        var offset = (this.$route.params.page - 1) * ITEMS_PER_PAGE;
        db.photos
            .filter(function (photo) {
                return photo.favorited === true;
            })
            .reverse()
            .offset(offset)
            .limit(ITEMS_PER_PAGE)
            .each(function(photo, cursor) {
                photo.id = cursor.primaryKey;
                self.$data.photos.push(photo);
            });
    },
    methods: {
        fetchData: function() {
            // console.log(this.$route.params.page);
            var self = this;
            // Find some photos
            var offset = (self.$route.params.page - 1) * ITEMS_PER_PAGE;
            self.$set(self.$data, 'photos', []);
            db.photos
                .filter(function (photo) {
                    return photo.favorited === true;
                })
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
        getTags: function(photo) {
            return photo.tags.split(' ');
        },
        pageChange: function(page) {
            console.log(page);
            this.$router.push({ name: 'favorites', params: { page: page }});
        }
    },
};
