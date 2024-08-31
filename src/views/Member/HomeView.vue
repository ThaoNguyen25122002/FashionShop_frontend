<template>
  <div v-if="!isLoading">
    <Hero />
    <NewProducts :products="newProducts" />
    <list-of-categories :categories="categories" />
    <Banner />
    <Testimonials />
  </div>
  <loading-view v-else />
</template>

<script setup>
import Hero from '@/components/Member/Layouts/Hero/Hero.vue'
// import TopRating from '@/components/Member/Layouts/TopRating.vue/TopRating.vue'
import ListOfCategories from '@/components/Member/Layouts/ListOfCategories/ListOfCategories.vue'
import Banner from '@/components/Member/Layouts/Banner/Banner.vue'
import Testimonials from '@/components/Member/Layouts/Testimonials/Testimonials.vue'
import NewProducts from '@/components/Member/Layouts/NewProducts/NewProducts.vue'
import LoadingView from '@/components/Loading/LoadingView.vue'
import axios from '@/axios/axios'
import { onMounted, ref } from 'vue'
const isLoading = ref(false)
const newProducts = ref([])
const categories = ref([])
const errorMessage = ref('')
const homeApi = async () => {
  isLoading.value = true
  try {
    const responses = await Promise.allSettled([
      axios.get('products/new'),
      axios.get('categories/sort')
    ])

    responses.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        if (index === 0) newProducts.value = result.value.data.data
        if (index === 1) categories.value = result.value.data.data
      } else {
        console.error(`Error fetching data from API ${index + 1}:`, result.reason)
        if (index === 0) errorMessage.value = 'Failed to load new products.'
        if (index === 1) errorMessage.value = 'Failed to load top sales products.'
      }
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    errorMessage.value = 'An unexpected error occurred.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await homeApi()
  console.log(newProducts.value)
  console.log(categories.value)
})
</script>
