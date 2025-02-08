<template>
  <div class="container mx-auto relative">
    <!-- Header -->
    <header class="py-4 border-b bg-white mx-auto max-w-7xl relative z-10">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-semibold text-gray-800">Hijja</h1>
        <button @click="toggleMobileMenu" class="text-blue-500 lg:hidden focus:outline-none">
          <span class="material-icons">menu</span>
        </button>
        <nav :class="{ block: showMobileMenu, hidden: !showMobileMenu, 'lg:block': true }">
          <ul class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center">
            <li>
              <input
                type="text"
                v-model="searchQuery"
                @input="searchProducts"
                placeholder="Search products"
                class="border rounded-md py-1 px-2"
              />
            </li>
            <li>
              <router-link to="/" class="text-blue-500 hover:text-blue-700">Home</router-link>
            </li>
            <li>
              <div class="relative">
                <button @click="toggleDropdown" class="text-blue-500 hover:text-blue-700">
                  Information
                </button>
                <ul
                  v-if="showDropdown"
                  @click.away="closeDropdown"
                  class="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg z-20"
                >
                  <li>
                    <router-link
                      to="/checkout"
                      class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                      >Checkout</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      to="/orders-list"
                      class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                      >Order List</router-link
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <router-link to="/blog" class="text-blue-500 hover:text-blue-700">Blog</router-link>
            </li>
            <!-- Shopping Cart -->
            <li class="relative">
              <button @click="toggleCart" class="relative">
                <span class="material-icons">shopping_cart</span>
                <!-- Show Cart Items Count -->
                <span
                  v-if="cart.length > 0"
                  class="absolute bottom-4 left-5 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                  >{{ cart.length }}</span
                >
              </button>
              <!-- Shopping Cart Dropdown -->
              <div
                v-if="showCart"
                class="absolute top-full right-0 bg-white border border-gray-200 mt-2 rounded-lg shadow-lg z-10 sm:w-40 md:w-80"
              >
                <div v-if="cart.length > 0" class="p-4">
                  <p class="text-lg font-semibold mb-2">Shopping Cart</p>
                  <ul>
                    <li
                      v-for="(item, index) in cart"
                      :key="item.id"
                      class="flex justify-between items-center mb-2"
                    >
                      <div class="flex-1">
                        <span>{{ item.name }}</span>
                        <br />
                        <span class="text-gray-500 text-sm"
                          >Variant: {{ item.selectedVariant.value }}</span
                        >
                        <br />
                        <span class="text-gray-500 text-sm">Price: {{ item.price }}</span>
                      </div>
                      <div class="flex items-center">
                        <button @click="decreaseQuantity(index)" class="text-gray-500 mx-2">
                          -
                        </button>
                        <span>{{ item.quantity }}</span>
                        <button @click="increaseQuantity(index)" class="text-gray-500 mx-2">
                          +
                        </button>
                      </div>
                      <button @click="removeFromCart(index)" class="text-red-500 ml-4">
                        Remove
                      </button>
                    </li>
                  </ul>
                  <router-link
                    to="/checkout"
                    class="block w-full bg-green-500 text-white py-2 px-4 rounded-lg mt-4 text-center"
                    >Checkout</router-link
                  >
                  <button
                    @click="toggleCart"
                    class="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
                  >
                    Close
                  </button>
                </div>
                <div v-else class="p-4">
                  <p>Your cart is empty</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Carousel -->
    <section class="max-w-full mx-auto mt-5 z-0">
      <Carousel />
    </section>

    <!-- Dropdown Content -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg z-20"
    >
      <!-- Dropdown items -->
    </div>

    <!-- Categories -->
    <section class="max-w-6xl mx-auto mt-11">
      <Categorie />
    </section>

    <!-- Notification -->
    <div v-if="showNotification" class="notification">
      <p>Please select a variant before adding to cart</p>
    </div>

    <!-- Products -->
    <section class="max-w-6xl mx-auto mt-11">
      <h2 class="text-2xl font-semibold mb-4">Products</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-3">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="product.photo"
            :alt="product.name"
            class="w-full h-60 object-cover object-center"
            @click="goToDetail(product.id)"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-2">Price: {{ product.price }}</p>
            <p class="text-gray-600 mb-2">Stock: {{ product.stock }}</p>
            <!-- Variant Dropdown -->
            <div class="mt-4">
              <label for="variants" class="block text-sm font-medium text-gray-700"
                >Variants:</label
              >
              <select
                v-model="product.selectedVariant"
                id="variants"
                name="variants"
                class="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option disabled value="-" selected>Select a variant</option>
                <option v-for="variant in product.varian" :key="variant.id" :value="variant">
                  {{ variant.value }}
                </option>
              </select>
            </div>
            <!-- Add to Cart Button -->
            <button
              @click="addToCart(product)"
              class="mt-4 font-bold py-2 px-4 rounded-md w-full"
              :class="{
                'bg-blue-500 hover:bg-blue-700 text-white': product.selectedVariant,
                'bg-gray-500 text-gray-300 cursor-not-allowed': !product.selectedVariant
              }"
              :disabled="!product.selectedVariant"
            >
              <span class="material-icons">shopping_cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <section class="py-4 border-b bg-white mx-auto max-w-7xl">
      <Footer />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

import Carousel from '@/components/Carousel.vue'
import Footer from '@/components/Footer.vue'
import Categorie from '@/components/Categorie.vue'

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      showCart: false,
      searchQuery: '',
      selectedVariant: null,
      showDropdown: false,
      showMobileMenu: false
    }
  },
  components: {
    Carousel,
    Footer,
    Categorie
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
          stock: product.stock,
          selectedVariant: null // Initialize selectedVariant
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
      if (!this.selectedVariant) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Produk berhasil dimasukan ke keranjang',
          confirmButtonText: 'OK'
        })
        const existingCartItem = this.cart.find(
          (item) =>
            item.id === product.id && item.selectedVariant.value === product.selectedVariant.value
        )
        if (existingCartItem) {
          existingCartItem.quantity++
        } else {
          const cartItem = {
            ...product,
            quantity: 1
          }
          this.cart.push(cartItem)
        }
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    increaseQuantity(index) {
      this.cart[index].quantity++
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--
      } else {
        this.removeFromCart(index)
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    toggleCart() {
      this.showCart = !this.showCart
    },
    goToDetail(productId) {
      this.$router.push(`/DetailProduct/${productId}`)
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    closeDropdown() {
      this.showDropdown = false
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
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
