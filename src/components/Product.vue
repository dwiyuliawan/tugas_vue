<template>
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
      />
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 mb-2">Price: {{ product.price }}</p>
        <p class="text-gray-600 mb-2">Stock: {{ product.stock }}</p>
        <!-- Variant Dropdown -->
        <div class="mt-4">
          <label for="variants" class="block text-sm font-medium text-gray-700">Variants:</label>
          <select
            v-model="product.selectedVariant"
            id="variants"
            name="variants"
            class="mt-1 block w-full border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option disabled value="">Select a variant</option>
            <option v-for="variant in product.varian" :key="variant.id" :value="variant">
              {{ variant.value }}
            </option>
          </select>
        </div>
        <!-- Add to Cart Button -->
        <button
          @click="addToCart(product)"
          class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
          :disabled="!product.selectedVariant"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      cart: [],
      showCart: false,
      searchQuery: ''
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://sistemtoko.com/public/demo/product')
        this.products = response.data.aaData.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          photo: product.photo, // Change 'image' to 'photo'
          varian: product.varian,
          stock: product.stock
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
      // Jika produk memiliki varian, pilih varian pertama sebagai default
      if (product.varian && product.varian.length > 0) {
        product.selectedVariant = product.varian[0]
      }
      this.cart.push(product)
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
