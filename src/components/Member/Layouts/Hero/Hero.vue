<template>
  <div
    class="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center duration-200"
  >
    <!-- Background pattern -->
    <div
      class="size-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9"
    ></div>
    <!-- Hero Section -->
    <div class="container pb-8 sm:pb-0">
      <swiper :modules="[Autoplay]" :autoplay="{ delay: 4000 }" :speed="1000" loop>
        <!-- Use SwiperSlide component for each slide -->
        <swiper-slide v-for="data in imageList" :key="data.id">
          <div class="grid grid-cols-1 sm:grid-cols-2">
            <div
              class="flex items-start flex-col gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10"
            >
              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold">
                {{ data.title }}
              </h1>
              <p class="text-sm">
                {{ data.description }}
              </p>
              <div class="">
                <button
                  class="bg-gradient-to-r from-primary to-secondary py-2 px-4 hover:scale-105 duration-200 transition-transform rounded-full text-white"
                >
                  Order Now
                </button>
              </div>
            </div>
            <!-- Image Section -->
            <div class="order-1 sm:order-2">
              <div>
                <img
                  class="size-[300px] sm:size-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto relative z-10"
                  :src="data.img"
                  alt=""
                />
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import Image1 from '../../../../assets/hero/women.png'
import Image2 from '../../../../assets/hero/shopping.png'
import Image3 from '../../../../assets/hero/sale.png'
// Import Swiper core and required modules
import { Autoplay } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'

const imageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
      'Phần này cho biết rằng khi kích thước màn hình nhỏ hơn hoặc bằng breakpoint sm (thường được định nghĩa trong file CSS hoặc framework CSS bạn đang sử dụng), phần tử này sẽ trở thành một flex container. Điều này có nghĩa là các phần tử con của nó sẽ được bố trí theo mô hình flexbox, cho phép bạn sắp xếp chúng một cách linh hoạt.'
  },
  {
    id: 2,
    img: Image2,
    title: "Upto 50% off on all Men's Wear",
    description:
      'Phần này cho biết rằng khi kích thước màn hình nhỏ hơn hoặc bằng breakpoint sm (thường được định nghĩa trong file CSS hoặc framework CSS bạn đang sử dụng), phần tử này sẽ trở thành một flex container. Điều này có nghĩa là các phần tử con của nó sẽ được bố trí theo mô hình flexbox, cho phép bạn sắp xếp chúng một cách linh hoạt.'
  },
  {
    id: 3,
    img: Image3,
    title: "Upto 50% off on all Men's Wear",
    description:
      'Phần này cho biết rằng khi kích thước màn hình nhỏ hơn hoặc bằng breakpoint sm (thường được định nghĩa trong file CSS hoặc framework CSS bạn đang sử dụng), phần tử này sẽ trở thành một flex container. Điều này có nghĩa là các phần tử con của nó sẽ được bố trí theo mô hình flexbox, cho phép bạn sắp xếp chúng một cách linh hoạt.'
  }
]
</script>
