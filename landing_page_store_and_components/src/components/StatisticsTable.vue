<!-- components/StatisticsTable.vue -->
<template>
  <div class="statistics-table">
    <h3>Statistics</h3>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>New Data</td>
          <td>{{ newDataCount }}</td>
        </tr>
        <tr>
          <td>Deleted Data</td>
          <td>{{ deletedDataCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      newDataCount: state => state.newDataCount,
      deletedDataCount: state => state.deletedDataCount,
    })
  }
};
</script>

<style scoped>
.statistics-table {
  margin-top: 20px;
  border-collapse: collapse;
}

.statistics-table table {
  width: 100%;
  border: 1px solid #ccc;
}

.statistics-table th,
.statistics-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

.statistics-table th {
  background-color: #f2f2f2;
}
</style>
