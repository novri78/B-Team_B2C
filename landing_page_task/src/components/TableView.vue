<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search...">
    
    <table v-if="filteredData.length">
      <thead>
        <tr>
          <th v-for="key in tableKeys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ itemDetails(item) }}</td>
          <td>{{ getPriceList(item) }}</td>
          <td><img :src="getImagePath(item.id)" alt="Product Image" style="width: 50px; height: 50px"></td> <!-- Add image column -->
        </tr>
      </tbody>
      <!-- Add new row for Total Price -->
      <tfoot>
        <tr>
          <td :colspan="tableKeys.length - 2" style="text-align: right; font-weight: bold;">Total Price:</td>
          <td style="font-weight: bold;">{{ calculateTotalPrice.toFixed(2) }}</td>
        </tr>
      </tfoot>
    </table>
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TableComponent',
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    ...mapGetters(['getData']),
    tableKeys() {
      return ['id', 'name', 'Details', 'Price_List', 'Image']; // Update tableKeys
    },
    filteredData() {
      return this.getData.filter(item => {
        // Filter based on search query
        return Object.values(item).some(value =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
    calculateTotalPrice() {
      return this.filteredData.reduce((total, item) => {
        if (item.data && (item.data.price > 0 || item.data.Price > 0)) {
          total += parseFloat(item.data.price || item.data.Price);
        }
        return total;
      }, 0);
    }
  },
  methods: {
    ...mapActions(['fetchData']),
    itemDetails(item) {
      let details = '';
      if (item.data) {
        for (const key in item.data) {
          details += `${key}: ${item.data[key]}, `;
        }
      }
      return details.slice(0, -2); // Remove trailing comma and space
    },
    getPriceList(item) {
      if (item.data && (item.data.price > 0 || item.data.Price > 0)) {
        return item.data.price || item.data.Price;
      }
      return '-';
    },
    getImagePath(id) {
      return require(`@/assets/img/${id}.jpg`);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: left;
}
tfoot td {
  border-top: 2px solid #000;
}
input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ddd;
}
</style>
