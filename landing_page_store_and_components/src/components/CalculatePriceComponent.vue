<template>
  <tfoot class="total-price">
    <td colspan="3" class="total-price-label">Total Price:</td>
    <td class="total-price-value">
      {{ formatCalculateTotalPrice }}
    </td>
  </tfoot>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["exchangeRate"]),
    ...mapGetters(["filteredData","calculateTotalPrice"]),
    calculateTotalPrice() {
      let total = 0;
      this.filteredData.forEach((item) => {
        if (item.data && item.data.price) {
          total += parseFloat(item.data.price);
        }
        if (item.data && item.data.Price) {
          total += parseFloat(item.data.Price);
        }
      });
      return total;
    },
    formatCalculateTotalPrice() {
      const totalPrice = this.calculateTotalPrice;      
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice * this.exchangeRate );
    },
  },
};
</script>