<template>
  <div>
    <div>
      <!-- Body Section -->
      <div class="container pt-14">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <!-- Card: Now horizontally aligned -->
          <div
            class="flex items-center space-x-4 p-4 border rounded-md hover:scale-105 hover:shadow-md transition-transform"
            v-for="data in ProductsData"
            :key="data.id"
          >
            <img class="h-[120px] w-[120px] object-cover rounded-md" :src="data.img" alt="" />
            <div>
              <h3 class="font-medium">{{ data.title }}</h3>
              <p class="text-sm text-gray-600">{{ data.color }}</p>
              <div class="flex items-center gap-1">
                <i class="fa-solid fa-star text-yellow-400"></i>
                <span>{{ data.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Img1 from '../../../../assets/women/women.png'
import Img2 from '../../../../assets/women/women2.jpg'
import Img3 from '../../../../assets/women/women3.jpg'
import Img4 from '../../../../assets/women/women4.jpg'

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: 'Women Ethnic',
    rating: 5.0,
    color: 'white',
    aosDelay: '0'
  },
  {
    id: 2,
    img: Img2,
    title: 'Women western',
    rating: 4.5,
    color: 'Red',
    aosDelay: '200'
  },
  {
    id: 3,
    img: Img3,
    title: 'Goggles',
    rating: 4.7,
    color: 'brown',
    aosDelay: '400'
  },
  {
    id: 4,
    img: Img4,
    title: 'Printed T-Shirt',
    rating: 4.4,
    color: 'Yellow',
    aosDelay: '600'
  }
]
</script>
