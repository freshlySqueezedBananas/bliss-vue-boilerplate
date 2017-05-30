<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  /* ============
   * Entry Point
   * ============
   *
   * The entry point of the application
   */

  import store from './app/store';
  import { router, i18n } from './bootstrap';

  export default {
    /**
     * The Vuex store
     */
    store,

    /**
     * The router
     */
    router,

    /**
     * The localization plugin
     */
    i18n,
  };
</script>
