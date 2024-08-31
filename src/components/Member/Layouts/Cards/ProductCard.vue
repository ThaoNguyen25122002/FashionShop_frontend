<template>
  <div class="p-2 md:w-1/4 transform hover:-translate-y-1 transition-transform">
    <div
      class="relative h-full border border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:shadow-lg"
    >
      <!-- Icon giữ nguyên kích thước -->
      <img
        class="absolute top-1 right-1 w-7 h-7 cursor-pointer"
        src="../../../../assets/icons/like-2.svg"
        alt=""
      />
      <!-- Kích thước ảnh -->
      <img
        class="lg:h-[240px] md:h-32 w-full object-cover object-center"
        :src="product.images[0].image_url"
        alt="product"
      />
      <div class="p-4">
        <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
        <h1 class="title-font text-base font-medium text-gray-900 mb-2">{{ product.name }}</h1>
        <p class="leading-relaxed mb-2 text-xs line-clamp-3">
          {{ product.description }}
        </p>
        <div class="flex items-center flex-wrap">
          <!-- Nút lớn hơn và đẹp hơn -->
          <router-link
            :to="{ name: 'ProductDetail', params: { id: product.id } }"
            class="inline-flex items-center md:mb-2 lg:mb-0 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-sm font-semibold hover:shadow-lg transition-shadow cursor-pointer"
          >
            Mua ngay
          </router-link>
          <span
            class="mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto text-xl text-secondary font-bold pr-2 py-1"
          >
            {{ store.formatCurrency(product.price) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/useCartStore'

const props = defineProps({
  product: Object
})
const store = useCartStore()
// console.log(props.product.images[0])
</script>
