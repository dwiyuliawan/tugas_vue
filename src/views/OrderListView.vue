<template>
  <div>
    <Navigasi />
    <div class="container mx-auto my-5 p-4">
      <h1 class="text-3xl font-semibold mb-6">Order List</h1>
      <div v-if="orders.length > 0" class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-2 px-4 border-b text-left">Order ID</th>
              <th class="py-2 px-4 border-b text-left">Transaction ID</th>
              <th class="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.order_id">
              <td class="py-2 px-4 border-b">{{ order.order_id }}</td>
              <td class="py-2 px-4 border-b">{{ order.transaction_id }}</td>
              <td class="py-2 px-4 border-b">
                <router-link
                  :to="'/orders/' + order.order_id"
                  class="text-indigo-600 hover:text-indigo-900"
                  >View Details</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No orders found</p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navigasi from '@/components/Navigasi.vue'
import Footer from '@/components/Footer.vue'

export default {
  data() {
    return {
      orders: []
    }
  },
  components: {
    Navigasi,
    Footer
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      const orderDetails = localStorage.getItem('orderDetails')
      if (orderDetails) {
        this.orders = JSON.parse(orderDetails)
      }
    }
  }
}
</script>
<style scoped>
.overflow-x-auto {
  overflow-x: auto;
}
.min-w-full {
  min-width: 100%;
}
</style>
