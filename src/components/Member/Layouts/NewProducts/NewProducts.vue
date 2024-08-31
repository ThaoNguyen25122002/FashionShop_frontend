<template>
  <!-- Header Section -->
  <div class="text-center mx-auto max-w-[600px] py-10">
    <h3 class="text-3xl text-primary font-bold">Sản Phẩm Mới Ra Mắt</h3>
  </div>
  <!-- Body -->
  <section class="text-gray-600">
    <div class="container">
      <div class="flex flex-wrap gap-y-3">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />

        <!-- Repeat other cards similarly -->
      </div>
    </div>
  </section>
  <div class="text-center mx-auto">
    <button class="bg-primary text-xl mt-4 px-6 py-2 text-white rounded-md">
      Xem tất cả <span class="font-semibold">-></span>
    </button>
  </div>
</template>

<script setup>
import ProductCard from '../Cards/ProductCard.vue'
const props = defineProps({
  products: Array
})
</script>
