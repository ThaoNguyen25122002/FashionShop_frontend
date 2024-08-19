<template>
  <div class="py-10 mb-10">
    <div class="container">
      <!-- Header Section -->
      <div class="text-center mx-auto max-w-[600px] py-14 mb-10">
        <p class="text-sm text-primary">What our customers are saying</p>
        <h3 class="text-3xl font-bold">Testimonials</h3>
        <p class="text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi Sit
          asperiores modi
        </p>
      </div>
      <!-- Testimonials Cards -->

      <swiper
        :modules="[Autoplay, Pagination]"
        :autoplay="{ delay: 2500 }"
        :speed="1000"
        :slides-per-view="3"
        loop
        :breakpoints="{
          640: {
            // Kích thước lớn hơn hoặc bằng 640px (sm)
            slidesPerView: 3 // Hiển thị 3 slide
          },
          0: {
            // Kích thước nhỏ hơn 640px
            slidesPerView: 1 // Hiển thị 1 slide
          }
        }"
      >
        <swiper-slide v-for="data in TestimonialData" :key="data.id"
          ><div className="my-6">
            <div
              className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl  bg-primary/10 relative"
            >
              <div className="mb-4">
                <img :src="data.img" alt="" className="rounded-full w-20 h-20" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 line-clamp-5">{{ data.text }}</p>
                  <h1 className="text-xl font-bold text-black/80 ">{{ data.name }}</h1>
                </div>
              </div>
              <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">,,</p>
            </div>
          </div></swiper-slide
        >
      </swiper>
    </div>
  </div>
</template>

<script setup>
// Import Swiper core and required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
const TestimonialData = [
  {
    id: 1,
    name: 'Victor',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio',
    img: 'https://picsum.photos/101/101'
  },
  {
    id: 2,
    name: 'Satya Nadella',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio',
    img: 'https://picsum.photos/102/102'
  },
  {
    id: 3,
    name: 'Virat Kohli',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio',
    img: 'https://picsum.photos/104/104'
  },
  {
    id: 5,
    name: 'Sachin Tendulkar',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio',
    img: 'https://picsum.photos/103/103'
  }
]
</script>
