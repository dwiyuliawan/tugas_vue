<template>

    <Navigasi />
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold mb-6">Order Detail</h1>
    <div v-if="order">
      <div class="bg-gray-200 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-semibold mb-4">Order ID: {{ order.orderId }}</h2>
        <p class="mb-4"><strong>Name:</strong> {{ order.name }}</p>
        <p class="mb-4"><strong>Email:</strong> {{ order.email }}</p>
        <p class="mb-4"><strong>Phone:</strong> {{ order.phone }}</p>
        <p class="mb-4"><strong>Address:</strong> {{ order.address }}</p>
        <p class="mb-4"><strong>Total Payment:</strong> {{ order.total }}</p>
        <h3 class="text-xl font-semibold mt-4">Items:</h3>
        <ul>
          <li v-for="item in order.items" :key="item.id" class="mb-2 flex items-center">
            <img :src="item.photo" alt="Product Image" class="w-16 h-16 object-cover rounded-md mr-4">
            <span>{{ item.name }} - {{ item.selectedVariant.value }} ({{ item.quantity }} x {{ item.price }})</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p class="text-red-500">Order not found</p>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navigasi from '@/components/Navigasi.vue'
import Footer from '@/components/Footer.vue'
export default {
  data() {
    return {
      order: null
    };
  },
  components: {
    Navigasi,
    Footer,
  },
  mounted() {
    this.fetchOrderDetail();
  },
  methods: {
    fetchOrderDetail() {
      const orderId = this.$route.params.orderId;
      const orderDetails = localStorage.getItem('orderDetails');
      if (orderDetails) {
        const order = JSON.parse(orderDetails);
        if (order.orderId === orderId) {
          this.order = order;
        }
      }
    }
  }
};
</script>

