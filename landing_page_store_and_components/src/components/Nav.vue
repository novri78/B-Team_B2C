<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/dataTable" class="nav-link">Data Table</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a href="#" @click.prevent="handleLogout" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Login from "@/components/LoginComponent.vue";

export default {
  name: "Nav",
  components: {
    Login,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout().then(() => {
        this.$router.push('/login')
      })
    }
  },
};
</script>
