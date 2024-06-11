<template>
    <tfoot>
        <td colspan="3" class="total-price-label">Total Price: </td>
        <td class="total-price-value">{{'$ ' + calculateTotalPrice }}</td>
    </tfoot>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
       ...mapGetters(["filteredData"]),
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
       }
    },
}
</script>