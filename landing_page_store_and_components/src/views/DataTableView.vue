<template>
  <div>
    <h2>All Data Simple List</h2>
    <TableDataComponent />
  </div>
</template>

<script>
import TableDataComponent from "@/components/TableDataComponent.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";

export default {
  components: {
    LogoutComponent,
    TableDataComponent,
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 20px;
}
</style>
