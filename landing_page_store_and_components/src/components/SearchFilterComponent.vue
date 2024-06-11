<template>
  <div class="search-filter-container">
    <input type="text" v-model="searchQuery" placeholder="Search...">
    |
    <select v-model="selectedName" @change="filterByName">
      <option value="">All Names</option>
      <option v-for="name in uniqueNames" :key="name" :value="name">{{ name }}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(['uniqueNames']),
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.commit("SET_SEARCH_QUERY", value);
      }
    },
    selectedName: {
      get() {
        return this.$store.state.selectedName;
      },
      set(value) {
        this.$store.commit("SET_SELECTED_NAME", value)
      }
    }
  },
  methods: {
    ...mapMutations(["SET_SEARCH_QUERY", "SET_SELECTED_NAME"]),
    updateSearchQuery(event) {
      this.SET_SEARCH_QUERY(event.target.value);
    },
    filterByName(event) {
      this.SET_SELECTED_NAME(event.target.value);
    },
    emitSearch() {
      this.$store.commit("SET_FILTER_SEARCH", this.searchQuery);
    },
  }
};
</script>
