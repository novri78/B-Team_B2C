<template>
  <div class="delete-confirmation">
    <p>Are you sure you want to delete this item?</p>
    <p>ID : {{ this.id }}</p>
    <button @click="confirmDelete()">Delete</button>
    <button type="button" @click="cancelDelete">Cancel</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      id: this.$route.params.id || '',
    }
  },
  methods: {
    confirmDelete() {
      if (window.confirm(`Are you sure you want to delete this item with ID ${this.id} ?`)) {
        this.deleteItem();
      }
    },
    deleteItem() {
      
      this.$store.dispatch('deleteListItem', this.id);
      alert('Item deleted successfully!');
      this.$router.push("/dataTable");

    },
    cancelDelete() {
      this.$router.push("/dataTable");
    },
  },
  computed: {
    ...mapState(['listData'])
  }
};
</script>
