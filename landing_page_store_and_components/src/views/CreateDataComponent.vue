<template>
  <div class="create-form">    
    <form @submit.prevent="submitForm">
      <div class="form-create">
        <h2>Create New Item</h2>
        <label for="id">ID:</label>
        <input type="text" v-model="id" required />

        <label for="name">Name:</label>
        <input type="text" v-model="name" required />

        <label for="details">Details:</label>
        <input type="text" v-model="details" required />

        <label for="price">Price:</label>
        <input type="number" v-model="price" required />

        <label for="image">Image:</label>
        <input type="text" v-model="image" required />
      </div>
      <div>
        <button type="submit">Submit</button>
      <button type="button" @click="cancelForm">Cancel</button>
      </div>      
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      details: "",
      price: "",
      image: "",
    };
  },
  methods: {
    submitForm() {
      const newItem = {
        id: this.id,
        name: this.name,
        data: {
          details: this.details,
          price: parseFloat(this.price),
          image: this.image,
        },
      };
      this.$store.dispatch("addListItem", newItem);
      console.error('new data', newItem)
      alert("Item created successfully!");
      this.resetForm();
      this.$router.push("/dataTable");
    },
    cancelForm() {
      this.$router.push("/dataTable");
    },
    resetForm() {
      this.id = "";
      this.name = "";
      this.details = "";
      this.price = "";
      this.image = "";
    },
  },
};
</script>

<style scoped>
/* General Styles */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7f6;
  margin: 35px;
  padding: 0;
  color: #333;
}

.create-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7f6;
}

.form-container {
  width: 40%;
  max-width: 500px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-create {
  margin-top: -175px;
  margin-bottom: 40px;
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}

input[type="text"],
input[type="number"],
input[type="url"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="url"]:focus {
  border-color: #3498db;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: translateY(1px);
}

@media (max-width: 768px) {
  .form-container {
    width: 80%;
    max-width: 100%;
  }

  button {
    width: calc(50% - 10px); /* 50% minus margin */
  }
}
</style>
