<template>
  <div>
    <h2>All Data Simple List</h2>
    <h3>Search, Filter, Select Item and Calculate in Component</h3>
    <h4>from https://api.restful-api.dev/objects</h4>
    <TableDataComponent />
  </div>
</template>

<script>
import TableDataComponent from "@/components/TableDataComponent.vue";

export default {
  components: {
    TableDataComponent,
  },
};
</script>
