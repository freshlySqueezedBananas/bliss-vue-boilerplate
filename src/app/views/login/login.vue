<template>
  <v-layout>
    <v-panel contextual-style="primary">
      <h1 class="panel-title" slot="heading">
        Logint
      </h1>
      <div slot="body">
        <form @submit.prevent="login(user)">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-envelope fa-fw"></i>
              </div>
              <input
                v-model="user.email"
                type="email"
                placeholder="Email"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-lock fa-fw"></i>
              </div>
              <input
                v-model="user.password"
                type="password"
                placeholder="Password"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
      <div slot="footer">
        No account?
        <router-link :to="{ name: 'register.index' }">Register</router-link>
      </div>
    </v-panel>
  </v-layout>
</template>

<script>
  /* ============
   * Login Index Page
   * ============
   *
   * Page where the user can login.
   */
  import authService from '@/app/services/auth';

  export default {
    data() {
      return {
        user: {
          email: null,
          password: null,
        },
      };
    },

    methods: {
      login(user) {
        authService.login(user);
      },
    },

    components: {
      VLayout: require('@/app/layouts/minimal.vue'),
      VPanel: require('@/app/components/panel.vue'),
    },
  };
</script>
