<template>
  <div class="home">
    <div class="background-body">
      <img alt="Vue logo" src="../assets/img/logo.png" style="margin-top: -750px" />
      <div class="title-homeview">
        <h2>Welcome to Your Vue.js App</h2>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.background-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh; /* Set the height to 50% of the viewport height */
  max-width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("@/assets/img/istockphoto-1428709516-1024x1024.jpg");
  color: black;
  text-align: center;
}

.logo {
  width: auto;
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

h2 {
  font-size: 2em;
  color: #333;
  margin: 0;
}

</style>
