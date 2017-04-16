import Dexie from 'dexie';

const db = new Dexie('flickr');
db.version(1).stores({
    photos: '++id,title,link,media,date_taken,description,published,author,author_id,tags',
    favorites: '++,&photo_id',
});

export default db;
