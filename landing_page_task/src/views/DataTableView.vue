<template>
  <div>
    <h2>All Data Simple List</h2>
    <h3>Search, Filter And Select Item</h3>
    <TableView />
  </div>
</template>

<script>
import TableView from '@/components/TableView.vue';

export default {
  name: 'dataTable',
  components: {
    TableView
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
