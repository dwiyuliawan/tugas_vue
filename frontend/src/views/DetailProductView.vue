<template>
  <div class="container mx-auto">
    <!-- Header -->
    <header class="py-4 border-b bg-white mx-auto max-w-7xl">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-semibold text-gray-800">Hijja</h1>
        <!-- Hamburger Menu for Mobile -->
        <button @click="toggleMobileMenu" class="text-blue-500 lg:hidden focus:outline-none">
          <span class="material-icons">menu</span>
        </button>
        <nav :class="{ block: showMobileMenu, hidden: !showMobileMenu, 'lg:block': true }">
          <!-- Search Product -->
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
                class="absolute top-full right-0 bg-white border border-gray-200 mt-2 rounded-lg shadow-lg z-10 w-80"
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
                          >Variant: {{ item.selectedVariant }}</span
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

    <main class="py-8">
      <!-- Product Details -->
      <section class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Product Image -->
          <div>
            <img
              :src="product.photo"
              :alt="product.name"
              class="w-full h-96 object-cover object-center rounded-lg shadow-md"
            />
          </div>
          <!-- Product Info -->
          <div>
            <h2 class="text-3xl font-semibold mb-2">{{ product.name }}</h2>
            <p class="text-xl text-gray-600 mb-4">Price: {{ product.price }}</p>
            <p class="text-lg text-gray-600 mb-4">Stock: {{ product.stock }}</p>
            <!-- Variant Dropdown -->
            <div class="mt-4">
              <label for="variants" class="block text-sm font-medium text-gray-700"
                >Variants:</label
              >
              <select
                v-model="selectedVariant"
                id="variants"
                name="variants"
                class="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option disabled value="" selected>Select a variant</option>
                <option>{{ product.varian }}</option>
              </select>
            </div>
            <!-- Add to Cart Button -->
            <button
              @click="addToCart"
              class="mt-4 font-bold py-2 px-4 rounded-md w-full"
              :class="{
                'bg-blue-500 hover:bg-blue-700 text-white': selectedVariant,
                'bg-gray-500 text-gray-300 cursor-not-allowed': !selectedVariant
              }"
              :disabled="!selectedVariant"
            >
              Add to Cart
            </button>
            <!-- Product Description -->
            <div class="mt-6">
              <h3 class="text-2xl font-semibold mb-2">Description</h3>
              <p class="text-gray-700">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="py-4 border-t bg-white mx-auto max-w-7xl">
      <Footer />
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Footer from '@/components/Footer.vue'

export default {
  data() {
    return {
      product: {},
      selectedVariant: null,
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      showCart: false,
      showDropdown: false,
      showMobileMenu: false
    }
  },
  components: {
    Footer
  },
  methods: {
    async fetchProduct() {
      try {
        const productId = this.$route.params.id
        const response = await axios.get(`https://sistemtoko.com/public/demo/single/${productId}`)
        this.product = {
          id: response.data.id,
          name: response.data.product_name,
          price: response.data.product_buy_price,
          photo: 'https://sistemtoko.com/img/user/demo/product/' + response.data.product_img,
          varian: response.data.varian_keyword_value,
          stock: response.data.product_qty_stock,
          description: response.data.user_description
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    },
    addToCart() {
      const existingCartItem = this.cart.find(
        (item) => item.id === this.product.id && item.selectedVariant === this.selectedVariant
      )
      if (existingCartItem) {
        existingCartItem.quantity++
      } else {
        const cartItem = {
          ...this.product,
          selectedVariant: this.selectedVariant,
          quantity: 1
        }
        this.cart.push(cartItem)
      }
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Produk berhasil dimasukan ke keranjang',
        confirmButtonText: 'OK'
      })
      localStorage.setItem('cart', JSON.stringify(this.cart))
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
    this.fetchProduct()
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
