<template>
  <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6">
    <div
      v-for="category in categories"
      :key="category.id"
      class="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        :src="category.image"
        :alt="category.name"
        class="w-full h-70 object-cover object-center"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          image: 'https://hijja.sistemtoko.com/img/user/hijja/media/u8DEdD_banner1.jpg',
          name: 'Category 1'
        },
        {
          id: 2,
          image: 'https://hijja.sistemtoko.com/img/user/hijja/media/bsHxJs_banner2.jpg',
          name: 'Category 2'
        },
        {
          id: 3,
          image: 'https://hijja.sistemtoko.com/img/user/hijja/media/88jcpq_banner3.jpg',
          name: 'Category 3'
        }
      ]
    }
  }
}
</script>
