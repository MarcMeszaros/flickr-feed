import Dexie from 'dexie';

describe('feed', function() {

    var db = new Dexie("TestDB");
    db.version(1).stores({
        photos: '++id,title,&link,media,date_taken,description,published,author,author_id,tags,favorited',
    });
    db.open().catch(function () {
        ok(false, "Could not open database");
        start();
    });

    it('should not duplicate entries', function() {
        db.transaction("rw", db.photos, function () {

            // Add photos
            db.photos.add({ link: "mylink" });
            db.photos.add({ link: "mylink2" });
            db.photos.add({ link: "mylink" });

            // Query photos
            db.photos.count().then(function(count) {
                expect(count).toBe(2);
            });

        }).catch(function (e) {

        }).finally(function() {
            db.close();
        });
    });
});
