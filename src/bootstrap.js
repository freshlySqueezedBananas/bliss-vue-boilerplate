/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application.
 */

/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';

Vue.config.debug = process.env.NODE_ENV !== 'production';

/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import axios from 'axios';
import authService from '@/app/services/auth';

axios.defaults.baseURL = process.env.API_LOCATION;
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      authService.logout();
    }
  });

Vue.$http = axios;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return axios;
  },
});

/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import VuexRouterSync from 'vuex-router-sync';
import store from './app/store';

store.dispatch('auth/check');

/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import routes from './app/routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: 'login.index',
    });
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next({
      name: 'home.index',
    });
  } else {
    next();
  }
});
VuexRouterSync.sync(store, router);

Vue.router = router;

/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */
import VueI18n from 'vue-i18n';
import messages from './locale';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

/* ============
 * Store.js
 * ============
 *
 * Cross-browser storage for all use cases.
 * Falls back to one storage method that works in every scenario by default.
 *
 * https://github.com/marcuswestin/store.js
 */
window.storage = require('store');

/* ============
 * Vue Media Query
 * ============
 *
 * Plugin that adds methods for working with media query in Vue
 *
 * https://github.com/AStaroverov/v-media-query
 */
import vMediaQuery from 'v-media-query';

Vue.use(vMediaQuery.default, {
  variables: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
});

/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 * Sass is used for this boilerplate.
 *
 * If you don't want to use Sass, that's fine!
 * Replace the sass directory with the CSS preprocessor you want.
 * Require the entry point here & install the webpack loader.
 *
 * http://sass-lang.com/
 */
require('./assets/sass/app.scss');

/* ============
 * Global registrations
 * ============
 *
 * Register modules globally
 */
import registerComponents from './app/components/index';
import registerLayouts from './app/layouts/index';

registerComponents();
registerLayouts();

export default {
  router,
  i18n,
};
