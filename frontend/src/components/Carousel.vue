<template>
  <div class="carousel" @mouseover="stopSlide" @mouseleave="startSlide">
    <div v-for="(item, index) in items" :key="index" :class="{ hidden: index !== activeIndex }">
      <img :src="item.image" :alt="item.alt" class="mx-auto min-w-full" />
    </div>
    <div class="carousel-buttons">
      <button @click="prev" class="mr-2">Previous</button>
      <button @click="next">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      intervalId: null, // Menyimpan ID interval untuk dihentikan nanti
      intervalDelay: 2000, // Waktu antara setiap geser otomatis (dalam milidetik)
      items: [
        {
          image: 'https://hijja.sistemtoko.com/img/user/hijja/media/F3na1Q_slide3.jpg',
          alt: 'Image 1'
        },
        {
          image: 'https://hijja.sistemtoko.com/img/user/hijja/media/mGMfXL_slide2.jpg',
          alt: 'Image 2'
        },
        {
          image: 'https://hijja.sistemtoko.com/img/user/hijja/media/nVHxmb_slide1.jpg',
          alt: 'Image 3'
        }
      ]
    }
  },
  created() {
    // Memulai slide otomatis ketika komponen dimuat
    this.startSlide()
  },
  methods: {
    prev() {
      this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length
    },
    next() {
      this.activeIndex = (this.activeIndex + 1) % this.items.length
    },
    startSlide() {
      // Memulai interval untuk geser otomatis
      this.intervalId = setInterval(() => {
        this.next()
      }, this.intervalDelay)
    },
    stopSlide() {
      // Menghentikan interval ketika kursor mouse berada di atas carousel
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style>
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel-buttons {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
