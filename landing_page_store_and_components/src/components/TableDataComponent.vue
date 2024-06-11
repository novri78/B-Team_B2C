<template>
  <div>
    <div class="table-container">
      <SearchFilterComponent/>
    </div>
    <!-- Show when data exist -->
    <table v-if="filteredData.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Details</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ itemDetails(item) }}</td>
          <td>{{ '$ ' +  getPriceList(item) }}</td>
          <td>
            <img :src="getImagePath(item.id)" :alt="item.name" />
          </td>
        </tr>
      </tbody>
      <CalculatePriceComponent />
    </table>
    <!-- Message if there is no Data -->
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SearchFilterComponent from "./SearchFilterComponent.vue";
import CalculatePriceComponent from "./CalculatePriceComponent.vue";

export default {
  components: {
    SearchFilterComponent,
    CalculatePriceComponent,
  },
  computed: {
    ...mapGetters([
      "filteredData",
      "itemDetails",
      "getPriceList",
      "calculateTotalPrice",
      "uniqueNames",
    ]),
  },
  methods: {
    ...mapMutations(["TOGGLE_ITEM_SELECTION"]),
    getImagePath(id) {
      return require(`@/assets/img/${id}.jpg`);
    },
    toggleSelection(item) {
      this.TOGGLE_ITEM_SELECTION(item, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  text-align: left;
}

thead th {
  background-color: #007bff;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tfoot td {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.total-price-label {
  text-align: right;
}

.total-price-value {
  text-align: center;
}

@media (max-width: 768px) {
  th, td {
    padding: 10px;
  }

  .data-table {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
