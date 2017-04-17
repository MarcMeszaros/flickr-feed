// Import Vue and the component being tested
import Vue from 'vue';
import Feed from '../app/feed/index.vue';

describe('Feed Component', function() {

    it('has a created hook', function() {
        expect(typeof Feed.created).toBe('function');
    });

    // Evaluate the results of functions in
    // the raw component options
    it('sets the correct default data', function() {
        expect(typeof Feed.data).toBe('function');
        const defaultData = Feed.data();
        expect(defaultData.photos.length).toBe(0);
        expect(defaultData.photosAdded.length).toBe(0);
        expect(defaultData.photosCount).toBe(0);
    });

});
