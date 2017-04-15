// styles
require('./app.less');
require('./index.html');

// libraries
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueProgressBar from 'vue-progressbar';

// setup the plugins
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueProgressBar, {
  color: '#fda49f',
  failedColor: '#971e20'
});

// define the components
import NotFoundComponent from './404/index.vue';
import IntroRoutes from './intro/routes.js';

// define routes and map to a component
const routes = [
    {
        path: '/',
        redirect: '/intro',
        // before we resolve
        beforeEnter: function(to, from, next) {
            var introComplete = localStorage.getItem('introComplete');
            if (introComplete !== null) {
                return next('/gallery');
            } else {
                return next();
            }
        }
    },
    // use fancy es2015 'spread' syntax to merge array
    ...IntroRoutes,
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
