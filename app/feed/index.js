import db from '../database.js';

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

        // start the sync worker
        var syncWorker = new Worker('/worker.full.js');
        syncWorker.onmessage = function(e) {
            console.log('Worker message received.');
            if (e.data.action === 'photosAdded') {
                self.$data.photos.concat(e.data.items);
            }
        };
        syncWorker.postMessage({action: 'start'})
    },
};
