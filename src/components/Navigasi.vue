<template>
  <!-- Header -->
  <header class="py-4 border-b bg-white mx-auto max-w-7xl">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-semibold text-gray-800">Hijja</h1>
      <!-- Hamburger Menu for Mobile -->
      <button @click="toggleMobileMenu" class="text-blue-500 lg:hidden focus:outline-none">
        <span class="material-icons">menu</span>
      </button>
      <nav :class="{ block: showMobileMenu, hidden: !showMobileMenu, 'lg:block': true }">
        <!-- Navigation Links -->
        <ul class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center">
          <li><router-link to="/" class="text-blue-500 hover:text-blue-700">Home</router-link></li>
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
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showDropdown: false,
      showMobileMenu: false
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    closeDropdown() {
      this.showDropdown = false
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>
