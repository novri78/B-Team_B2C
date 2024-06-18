<template>
  <div class="table-container">
    <!-- Container for Search & Filter -->
    <div class="search-filter-container">
      <!-- Input searching -->
      <input type="text" v-model="searchQuery" placeholder="Search...">
      <!-- Filter by name dropdown -->
      <select v-model="selectedName" @change="filterByName">
        <option value="">All Names</option>
        <option v-for="name in uniqueNames" :key="name" :value="name">{{ name }}</option>
      </select>
    </div>
    
    <!-- Show when data exist -->
    <table v-if="filteredData.length">
      <thead>
        <tr>
          <!-- Create Table Header with 'Key' from Data Available -->
          <th v-for="key in tableKeys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- Show Data Rows -->
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ itemDetails(item) }}</td>
          <td>{{ getPriceList(item) }}</td>
          <td><img :src="getImagePath(item.id)" :alt="`Img of ${item.name}`" class="product-image"></td> <!-- Add image column -->
        </tr>
      </tbody>
      <!-- Add new row for Total Price -->
      <tfoot>
        <tr>
          <td :colspan="tableKeys.length - 2" class="total-price-label">Total Price:</td>
          <td class="total-price-value">{{ calculateTotalPrice.toFixed(2) }}</td>
        </tr>
      </tfoot>
    </table>
    <!-- Message if there is no Data -->
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TableComponent',
  data() {
    return {
      searchQuery: '',                                         //Search Query
      selectedName: '',                                        //Selected name for Filter
    };
  },
  computed: {
    ...mapGetters(['getData']),
    tableKeys() {
      return ['id', 'name', 'Details', 'Price_List', 'Image']; // Update tableKeys
    },
    filteredData() {
      // Filter the data by searchQuery
      let data = this.getData.filter(item => {
        return Object.values(item).some(value =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });

      // Filter by selected name
      if (this.selectedName) {
        data = data.filter(item => item.name === this.selectedName);
      }

      return data;
    },
    calculateTotalPrice() {
      // Calculate Total Price from data filtered
      return this.filteredData.reduce((total, item) => {
        if (item.data && (item.data.price > 0 || item.data.Price > 0)) {
          total += parseFloat(item.data.price || item.data.Price);
        }
        return total;
      }, 0);
    },
    // Create Unique name from data
    uniqueNames() {
      const names = this.getData.map(item => item.name);
      return [...new Set(names)];
    }
  },
  methods: {
    ...mapActions(['fetchData']),
    itemDetails(item) {
      // Create string Details from item data
      let details = '';
      if (item.data) {
        for (const key in item.data) {
          details += `${key}: ${item.data[key]}, `;
        }
      }
      return details.slice(0, -2); // Remove trailing comma and space
    },
    // Get value price or Price from data
    getPriceList(item) {
      if (item.data && (item.data.price > 0 || item.data.Price > 0)) {
        return item.data.price || item.data.Price;
      }
      return '-';
    },
    getImagePath(id) {
      // create path picture base on Id
      return require(`@/assets/img/${id}.jpg`);
    },
    filterByName() {
      // Trigger the computed property to re-evaluate by simply accessing it
      return this.filteredData;
    }
  },
  created() {
    // trigger action fetchData when component built
    this.fetchData();
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="text"], select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tfoot td {
  border: 1px solid #ddd;
}

.product-image {
  width: 95px;
  height: 50px;
}
</style>
