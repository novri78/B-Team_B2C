<template>
  <div id="app">
    <Nav />    
    <router-view/>
  </div>
</template>

<script>
// Import necessary Vuex helpers and components
import Nav from "@/components/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style>
/* Import fonts from Google Fonts */
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800/");

/* General styles for the app */
* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: "Fira-Sans", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: "Fira-Sans", sans-serif;
}

body,
html,
#app {
  width: 100%;
  height: 100%;
}

#app {
  text-align: center;  
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 4px 80px rgba(34, 35, 58, 0.2);
}

.auth-wrapper :focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding: 20px;
}

.auth-inner {
  width: 450px;
  margin: auto;  
  background: #ffffff;
  box-shadow: 0px 4px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
</style>

