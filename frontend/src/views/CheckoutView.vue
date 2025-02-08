<template>
  <Navigasi />
  <div class="checkout-page container mx-auto p-4 flex flex-wrap lg:flex-nowrap gap-6">
    <div class="cart w-full lg:w-1/2 bg-white shadow-md rounded-lg border border-grey p-4">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">Shopping Cart</h2>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="cart-item flex items-center bg-white shadow-md rounded-lg border border-grey p-4 mb-4"
      >
        <img :src="item.photo" alt="Product Image" class="w-16 h-16 object-cover rounded-md mr-4" />
        <div class="cart-item-details text-gray-700">
          <p class="font-semibold text-gray-700">{{ item.name }}</p>
          <p>{{ item.selectedVariant.value }}</p>
          <p>Rp.{{ item.price }} x {{ item.quantity }}</p>
        </div>
      </div>
      <div class="total">
        <p class="text-gray-700">Total: Rp.{{ totalPayment }}</p>
        <p class="text-gray-700">Total Shipping Cost: Rp.{{ shippingMethod }}</p>
        <p class="text-xl font-bold text-gray-700">Grand Total: Rp.{{ grandTotal }}</p>
      </div>
    </div>
    <div class="checkout-form w-full lg:w-1/2 bg-white shadow-md rounded-lg border border-grey p-4">
      <h2 class="text-2xl font-semibold mb-4">Checkout</h2>
      <form @submit.prevent="confirmOrder" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="province" class="block text-sm font-medium text-gray-700">Province</label>
          <select
            id="province"
            v-model="province"
            @change="fetchCities"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option
              v-for="province in provinces"
              :key="province.province_id"
              :value="province.province_id"
            >
              {{ province.province }}
            </option>
          </select>
        </div>
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">City</label>
          <select
            id="city"
            v-model="city"
            @change="fetchSubdistricts"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option v-for="city in cities" :key="city.city_id" :value="city.city_id">
              {{ city.type }} {{ city.city_name }}
            </option>
          </select>
        </div>
        <div>
          <label for="subdistrict" class="block text-sm font-medium text-gray-700"
            >Subdistrict</label
          >
          <select
            id="subdistrict"
            v-model="subdistrict"
            @change="fetchShippingCost"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option
              v-for="subdistrict in subdistricts"
              :key="subdistrict.subdistrict_id"
              :value="subdistrict.subdistrict_id"
            >
              {{ subdistrict.subdistrict_name }}
            </option>
          </select>
        </div>
        <div>
          <label for="shipping" class="block text-sm font-medium text-gray-700"
            >Shipping Method</label
          >
          <select
            id="shipping"
            v-model="shippingMethod"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option
              v-for="method in shippingMethods"
              :key="method.service"
              :value="method.cost[0].value"
            >
              {{ method.description }} - Rp.{{ method.cost[0].value }} (ETD:
              {{ method.cost[0].etd }})
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
        >
          Confirm Order
        </button>
      </form>
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
      cartItems: [],
      name: '',
      email: '',
      phone: '',
      provinces: [],
      cities: [],
      subdistricts: [],
      shippingMethods: [],
      province: '',
      city: '',
      subdistrict: '',
      shippingMethod: 0,
      grandTotal: 0
    }
  },
  components: {
    Navigasi,
    Footer
  },
  methods: {
    fetchProvinces() {
      fetch('https://demo.sistemtoko.com/province')
        .then((response) => response.json())
        .then((data) => {
          this.provinces = data
        })
    },
    fetchCities() {
      fetch(`https://demo.sistemtoko.com/city/${this.province}`)
        .then((response) => response.json())
        .then((data) => {
          this.cities = data
        })
    },
    fetchSubdistricts() {
      fetch(`https://demo.sistemtoko.com/subdistrict?id=${this.city}`)
        .then((response) => response.json())
        .then((data) => {
          this.subdistricts = data
        })
    },
    fetchShippingCost() {
      fetch(`https://demo.sistemtoko.com/ongkir?id=440&destination=${this.subdistrict}&weight=200`)
        .then((response) => response.json())
        .then((data) => {
          this.shippingMethods = data.data.map((method) => ({
            ...method,
            description: `${method.name} - ${method.costs[0].service}`,
            cost: method.costs[0].cost
          }))
        })
    },
    calculateTotal() {
      this.grandTotal = this.totalPayment + this.shippingMethod
    },
    async confirmOrder() {
      try {
        const response = await fetch('http://localhost:80/php/create-transaction.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: this.grandTotal,
            name: this.name,
            email: this.email,
            phone: this.phone
          })
        })

        const result = await response.json()

        if (result.token) {
          window.snap.pay(result.token, {
            onSuccess: (result) => {
              let transactions = JSON.parse(localStorage.getItem('orderDetails'))

              if (!Array.isArray(transactions)) {
                transactions = []
              }

              transactions.push(result)
              localStorage.setItem('orderDetails', JSON.stringify(transactions))
              localStorage.removeItem('cart')
              this.$router.push('/orders-list')
            },
            onPending: (result) => {
              alert('Waiting for your payment!')
              console.log(result)
            },
            onError: (result) => {
              alert('Payment failed!')
              console.log(result)
            },
            onClose: () => {
              alert('You closed the popup without finishing the payment')
            }
          })
        } else {
          alert('Failed to get payment token')
        }
      } catch (e) {
        alert('Failed to process your request')
        console.log(e)
      }
    }
  },
  computed: {
    totalPayment() {
      return this.cartItems.reduce((total, item) => {
        const price = item.price
        const quantity = item.quantity
        return total + price * quantity * 1000
      }, 0)
    }
  },
  watch: {
    shippingMethod() {
      this.calculateTotal()
    }
  },
  mounted() {
    const cart = localStorage.getItem('cart')
    if (cart) {
      this.cartItems = JSON.parse(cart)
    }
    this.fetchProvinces()
    this.calculateTotal()
  }
}
</script>

<style>
.checkout-page {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.cart,
.checkout-form {
  width: 100%;
  max-width: 600px;
}
@media (min-width: 1024px) {
  .checkout-form {
    order: 1;
  }
}
</style>
