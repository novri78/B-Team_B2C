<template>
  <button @click="logout">Logout</button>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/"); // Redirect to login page after logout
    },
  },
};
</script>
