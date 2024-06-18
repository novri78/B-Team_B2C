<template>
  <div class="search-filter-container">
    <label for="filterProduct"></label>
    <input
      type="text"
      v-model="searchQuery"
      id="filterProduct"
      placeholder="Search..."
    />| <button @click="emitSearch">Search</button>|
    <select v-model="selectedName" @change="filterByName">
      <option value="">All Names</option>
      <option v-for="name in uniqueNames" :key="name" :value="name">
        {{ name }}
      </option>
    </select>

    <div class="exchange-rate">
      <label id="exchange-rate">Exchange Rate (USD to IDR): </label>
      <input type="number" v-model.number="exchangeRate" id="exchange-rate" />
    </div>

    <td><button @click="goToCreate()" class="create-data">+Add</button></td>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import CreateDataComponent from "../views/CreateDataComponent.vue";

export default {
  components: {
    CreateDataComponent,
  },
  data() {
    return {
      searchQuery: "",
      isCreateFormVisible: false,
      isUpdateFormVisible: false,
      isDeleteFormVisible: false,
      currentItem: null,
      currentItemId: null,
    };
  },
  computed: {
    ...mapGetters([
      "uniqueNames",
      "filteredData",
      "itemDetails",
      "getPriceList",
      "calculateTotalPrice",
      "uniqueNames",
      "formatGetPriceList",
      "formatCalculateTotalPrice",
      "exchangeRate",
    ]),

    selectedName: {
      get() {
        return this.$store.state.selectedName;
      },
      set(value) {
        this.$store.commit("SET_SELECTED_NAME", value);
      },
    },
    exchangeRate: {
      get() {
        return this.$store.state.exchangeRate;
      },
      set(value) {
        this.$store.commit("SET_EXCHANGE_RATE", value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "SET_SEARCH_QUERY",
      "SET_SELECTED_NAME",
      "SET_EXCHANGE_RATE",
    ]),
    ...mapActions(["addItem", "updateItem", "deleteItem"]),
    goToCreate() {
      this.$router.push("/dataTable/create");
    },
    updateSearchQuery(event) {
      this.SET_SEARCH_QUERY(event.target.value);
    },
    filterByName(event) {
      this.SET_SELECTED_NAME(event.target.value);
    },
    emitSearch() {
      this.$store.commit("SET_FILTER_SEARCH", this.searchQuery);
    },
    emitExchangeRate(_event) {
      this.$store.commit("SET_EXCHANGE_RATE", this.exchangeRate);
    },
    addItem() {
      this.$router.push({ name: "Create" });
    },
  },
};
</script>