<template>
  <div class="login-form">
    <div class="container">
      <div class="login-wrapper">
        <h1>B2C-VUE</h1>
        <form @submit.prevent="login">
          <h2>Login</h2>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />

          <label for="password">Password:</label>
          <input type="password" v-model="password" required />

          <button type="submit">Login</button>
          <p class="register-link">
            Don't have an account? <a href="#">Register here</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/dataTable"); // Redirect after successful login
      } catch (error) {
        alert("Login failed. Please check your credentials and try again.");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.login-form {
  background-size: cover;
  background-position: center;
  background-image: url('@/assets/img/istockphoto-1428709516-1024x1024.jpg');  
  margin-top: -20%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #f5f5f5;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  margin-right: 4%;
}

.login-wrapper {
  background-color: #fcfcf9;
  padding: 50px 50px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin-top: 550px;
  margin-right: -32px;
  margin-bottom: 25px;
}

h1 {
  font-weight: 500;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #2980b9;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 30px 20px;
  }
}
</style>
