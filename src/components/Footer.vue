<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-b pb-2">
      <div class="col-span-1">
        <h3 class="font-bold text-lg mb-2">CONTACT US</h3>
        <ul>
          <li>
            <a href="#" class="hover:underline">jL. RA Kartini, Ketanggungan, Brebes</a>
          </li>
          <li><a href="#" class="hover:underline">+6283117764077</a></li>
        </ul>
      </div>
      <div class="col-span-1">
        <h3 class="font-bold text-lg mb-2">OUR SERVICES</h3>
        <ul>
          <li><a href="#" class="hover:underline">CARA PEMBELIAN</a></li>
          <li><a href="#" class="hover:underline">F.A.Q</a></li>
          <li><a href="#" class="hover:underline">KONFIRMASI PEMBAYARAN</a></li>
          <li><a href="#" class="hover:underline">TENTANG</a></li>
          <li><a href="#" class="hover:underline">SYARAT & KETENTUAN</a></li>
        </ul>
      </div>
      <div class="col-span-1">
        <h3 class="font-bold text-lg mb-2">FOLLOW US</h3>
        <a href="#" class="hover:underline">
          <p><span class="material-icons">facebook</span>@dwiyuliawan</p>
        </a>
      </div>
    </div>
    <br />
    <div class="container mx-auto text-center">
      <div class="col-span-1">
        <h3 class="font-bold text-lg mb-2">Dibuat oleh dwi yuliawan</h3>
      </div>
    </div>
  </footer>
</template>

<script>
import feather from 'feather-icons'

export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
