<template>
  <div class="search-filter-container">
    <label for="filterProduct"></label>
    <input 
      type="text" 
      v-model="searchQuery"
      id="filterProduct" 
      placeholder="Search..." /> |
    <button @click="emitSearch">Search</button> |

    <select v-model="selectedName" @change="filterByName">
      <option value="">All Names</option>
      <option v-for="name in uniqueNames" :key="name" :value="name">
        {{ name }}
      </option>
    </select>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      searchQuery: '',
    }
  },
  computed: {
    ...mapGetters(["uniqueNames"]),
    // searchQuery: {
    //   set(value) {
    //     this.$store.commit("SET_SEARCH_QUERY", value);
    //   },
    // },
    selectedName: {
      get() {
        return this.$store.state.selectedName;
      },
      set(value) {
        this.$store.commit("SET_SELECTED_NAME", value);
      },
    },
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
  },
};
</script>
