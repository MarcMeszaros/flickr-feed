// styles
require('./app.less');
require('./index.html');

// vue.js + plugins
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VuePaginate from 'vuejs-paginate';
import VueProgressBar from 'vue-progressbar';

// setup the plugins
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('paginate', VuePaginate);
Vue.use(VueProgressBar, {
  color: '#fda49f',
  failedColor: '#971e20'
});

// define the components
import NotFoundComponent from './404/index.vue';
import FavoriteRoutes from './favorite/routes.js';
import FeedRoutes from './feed/routes.js';

// define routes and map to a component
const routes = [
    {
        path: '/',
        redirect: '/feed/1'
    },
    // use fancy es2015 'spread' syntax to merge array
    ...FavoriteRoutes,
    ...FeedRoutes,
    {
        path: '*',
        component: NotFoundComponent
    }
]

// create the router instance and pass the `routes` option
const router = new VueRouter({
  mode: 'history',
  routes: routes
})

// create and mount the root instance.
const app = new Vue({
  router,
}).$mount('#app')
