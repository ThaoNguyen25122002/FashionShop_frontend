<template>
  <div class="container pt-14">
    <!-- Header Section -->
    <div class="mb-24">
      <p class="text-sm text-primary">Top Rated Products for you</p>
      <h3 class="text-3xl font-bold">Best Products</h3>
      <p class="text-xs text-gray-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit asperiores
        modi
      </p>
    </div>
    <!-- Grid Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
      <div
        v-for="data in ProductsData"
        :key="data.id"
        class="rounded-2xl bg-white hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
      >
        <div class="h-[100px]">
          <img
            class="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
            :src="data.img"
            alt=""
          />
        </div>
        <div class="p-4 text-center">
          <div class="flex justify-center items-center gap-1">
            <i class="text-yellow-500 fa-solid fa-star"></i>
            <i class="text-yellow-500 fa-solid fa-star"></i>
            <i class="text-yellow-500 fa-solid fa-star"></i>
            <i class="text-yellow-500 fa-solid fa-star"></i>
          </div>
          <h3 class="font-medium text-xl">{{ data.title }}</h3>
          <p class="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
            {{ data.description }}
          </p>
          <button
            class="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Img1 from '../../../../assets/shirt/shirt.png'
import Img2 from '../../../../assets/shirt/shirt2.png'
import Img3 from '../../../../assets/shirt/shirt3.png'

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: 'Casual Wear',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 2,
    img: Img2,
    title: 'Printed shirt',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    img: Img3,
    title: 'Women shirt',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
]
</script>
