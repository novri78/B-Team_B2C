<template>
  <div>
    <div class="table-container">
      <SearchFilterComponent />
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
          <th colspan="2" class="action-head">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ itemDetails(item) }}</td>
          <td>{{ formatGetPriceList(item) }}</td>
          <td>
            <img :src="getImagePath(item.id)" :alt="item.name" />
          </td>
          <td><button @click="goToUpdate(item.id)" class="update-data">Update</button></td>
          <td>
            <button @click="goToDelete(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
      <CalculatePriceComponent />
    </table>
    <!-- Message if there is no Data -->
    <p v-else>No data available</p>
  </div>
  <StatisticsTable />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SearchFilterComponent from "./SearchFilterComponent.vue";
import CalculatePriceComponent from "./CalculatePriceComponent.vue";
import StatisticsTable from './StatisticsTable.vue';

export default {
  data() {
    return {
      isUpdateFormVisible: false,
      isDeleteFormVisible: false,
      currentItem: null,
      currentItemId: null,
    };
  },
  components: {
    SearchFilterComponent,
    CalculatePriceComponent,
    StatisticsTable
  },
  computed: {
    ...mapGetters([
      "filteredData",
      "itemDetails",
      "getPriceList",
      "calculateTotalPrice",
      "uniqueNames",
      "formatGetPriceList",
      "formatCalculateTotalPrice",
      "exchangeRate"
    ]),
  },
  methods: {
    ...mapMutations(["TOGGLE_ITEM_SELECTION", "SET_EXCHANGE_RATE"]),
    updateExchangeRate(event) {
      this.setExchangeRate(event.target.value);
    },
    getImagePath(id) {
      return require(`@/assets/img/${id}.jpg`);
    },
    toggleSelection(item) {
      this.TOGGLE_ITEM_SELECTION(item, 0);
    },
    goToUpdate(id) {
      this.$router.push(`/dataTable/update/${id}`);
    },
    goToDelete(id) {
      this.$router.push(`/dataTable/delete/${id}`);
    }
  },
};
</script>
