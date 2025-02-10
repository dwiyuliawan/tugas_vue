<template>
  <div class="container mx-auto">
    <!-- Header -->
    <header class="py-4 border-b bg-white mx-auto max-w-7xl">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-semibold text-gray-800">Hijja</h1>
        <nav>
          <!-- Search Product -->
          <ul class="flex space-x-4 items-center">
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
              <router-link to="/about" class="text-blue-500 hover:text-blue-700"
                >Information</router-link
              >
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
        <!-- Product Title-->
        <h1 class="text-4xl font-semibold text-gray-800">{{ product.name }}</h1>
        <p class="text-xl font-semibold text-gray-800 mb-5">By: {{ product.author }}</p>
        <hr />
        <p class="py-3">{{ product.status }} on {{ product.update_at }}</p>
        <hr />
        <!-- Product Image -->
        <div class="my-5">
          <img
            :src="product.photo"
            :alt="product.name"
            class="object-cover object-center rounded-lg shadow-md"
          />
        </div>
        <hr />
        <p>
          {{ product.page_body }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          dolor exercitationem consequatur, eius inventore eaque perspiciatis unde pariatur veniam
          quo fuga adipisci totam temporibus corrupti error? Quos vero ullam sapiente atque.
          Assumenda, libero voluptatem labore velit non, perferendis sed quae cumque, dolores totam
          a laboriosam reprehenderit itaque voluptatibus fugiat doloremque et. Voluptate aperiam,
          commodi placeat veniam, mollitia vel nostrum nam voluptas voluptatum labore, quos sint!
          Unde iste iusto, inventore amet rerum facere ut eaque? Harum voluptas, veritatis sequi
          quas porro minus veniam cupiditate dolore eos impedit aliquam reprehenderit, quibusdam
          iusto voluptatum. Pariatur, eius fugiat veritatis consequuntur suscipit impedit enim
          officiis.
        </p>
      </section>
    </main>

    <footer class="py-4 border-t bg-white mx-auto max-w-7xl">
      <Footer />
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import Footer from '@/components/Footer.vue'

export default {
  data() {
    return {
      product: {},
      selectedVariant: null,
      cart: [],
      showCart: false
    }
  },
  components: {
    Footer
  },
  methods: {
    async fetchProduct() {
      try {
        const productId = this.$route.params.slug
        const response = await axios.get(
          `https://demo.sistemtoko.com/public/demo/article/${productId}`
        )
        this.product = {
          id: response.data.id,
          name: response.data.page_title,
          photo: 'http://demo.sistemtoko.com/img/user/demo/blog/' + response.data.page_img,
          author: response.data.user.author,
          page_body: response.data.page_body,
          status: response.data.page_status,
          update_at: response.data.updated_at
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    },
    addToCart() {
      const existingCartItem = this.cart.find(
        (item) =>
          item.id === this.product.id && item.selectedVariant.value === this.selectedVariant.value
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
