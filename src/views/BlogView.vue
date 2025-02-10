<template>
  <div class="container mx-auto">
    <Navigasi />
    <!-- Products -->
    <section class="max-w-6xl mx-auto mt-11">
      <h2 class="text-2xl font-semibold mb-4">Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="product.photo"
            :alt="product.name"
            class="w-full h-60 object-cover object-center"
            @click="goToDetail(product.slug)"
          />
          <div class="p-4">
            <p class="text-xl text-center mb-2">{{ product.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-4 border-b bg-white mx-auto max-w-7xl">
      <Footer />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Footer from '@/components/Footer.vue'
import Navigasi from '@/components/Navigasi.vue'

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      cart: [],
      showCart: false,
      searchQuery: '',
      showNotification: false
    }
  },
  components: {
    Navigasi,
    Footer
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://demo.sistemtoko.com/demo/blog')
        this.products = response.data.aaData.map((product) => ({
          id: product.id,
          slug: product.slug,
          name: product.title,
          photo: 'http://demo.sistemtoko.com/img/user/demo/blog/' + product.img
        }))
        this.filteredProducts = this.products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    searchProducts() {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    addToCart(product) {
      if (!product.selectedVariant) {
        this.showNotification = true
        setTimeout(() => {
          this.showNotification = false
        }, 2000)
        return
      }

      const existingCartItem = this.cart.find(
        (item) =>
          item.id === product.id && item.selectedVariant.value === product.selectedVariant.value
      )

      if (existingCartItem) {
        existingCartItem.quantity++
      } else {
        const cartItem = {
          ...product,
          selectedVariant: product.selectedVariant, // Ensure selected variant is stored
          quantity: 1 // Initialize quantity
        }
        this.cart.push(cartItem)
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    },
    increaseQuantity(index) {
      this.cart[index].quantity++
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--
      } else {
        this.removeFromCart(index)
      }
    },
    toggleCart() {
      this.showCart = !this.showCart
    },
    goToDetail(productId) {
      this.$router.push(`/Article/${productId}`)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style>
.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fixed-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
</style>
