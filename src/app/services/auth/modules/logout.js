import Vue from 'vue';
import store from '@/app/store';

export default () => {
  store.dispatch('auth/logout');
  Vue.router.push({
    name: 'login.index',
  });
};
