// Import Vue and the component being tested
import Vue from 'vue';
import Favorite from '../app/favorite/index.vue';

describe('Favorite Component', function() {

    it('has a created hook', function() {
        expect(typeof Favorite.created).toBe('function');
    });

    // Evaluate the results of functions in
    // the raw component options
    it('sets the correct default data', function() {
        expect(typeof Favorite.data).toBe('function');
        const defaultData = Favorite.data();
        expect(defaultData.photos.length).toBe(0);
        expect(defaultData.photosCount).toBe(0);
    });
});
