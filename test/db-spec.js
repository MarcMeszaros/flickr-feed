require('jasmine-promises');

import Dexie from 'dexie';

describe('database', function() {

    var db;

    beforeEach(function() {
        db = new Dexie("TestDB");
        db.version(1).stores({
            photos: '++id,title,&link,media,date_taken,description,published,author,author_id,tags,favorited',
        });
        db.open().catch(function () {
            fail('Could not open database');
        });
    });

    afterEach(function() {
        db.close();
    })

    it('should not duplicate entries', function() {
        db.transaction("rw", db.photos, function () {
            // Add photos
            db.photos.add({ link: "mylink" });
            db.photos.add({ link: "mylink2" });
            db.photos.add({ link: "mylink" });
        }).catch(function (e) {
            // console.log(e);
        });

        return db.photos.count().then(function(count) {
            expect(count).toBe(2);
        });
    });
});
