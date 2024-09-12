<template>
  <!-- Header Section -->
  <div v-if="!isLoading" class="mt-[50px]">
    <div v-if="products.length > 0">
      <div class="text-center mx-auto max-w-[600px]">
        <h3 class="text-3xl text-primary font-bold mb-10">
          Kết quả tìm kiếm cho: "{{ searchQuery }}"
        </h3>
      </div>
      <!-- Body -->
      <section class="text-gray-600">
        <div class="container">
          <!-- <h1>{{ products.length }}</h1> -->
          <div class="flex flex-wrap gap-y-3">
            <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
          </div>
        </div>
      </section>
      <div class="text-center mx-auto">
        <button class="bg-primary text-xl mt-4 px-6 py-2 text-white rounded-md">
          Xem tất cả <span class="font-semibold">-></span>
        </button>
      </div>
    </div>
    <div v-else class="text-3xl text-primary font-bold h-screen text-center">
      <h1>Không có sản phẩm nào thuộc danh mục này!!!</h1>
    </div>
  </div>
  <LoadingView v-else />
</template>

<script setup>
import LoadingView from '@/components/Loading/LoadingView.vue'
import ProductCard from '@/components/Member/Layouts/Cards/ProductCard.vue'
import axios from '@/axios/axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const searchQuery = ref(route.query.q || '')
const products = ref([])
const toast = useToast()
const isLoading = ref(false)
const fetchProducts = async () => {
  try {
    isLoading.value = true
    const { data } = await axios.get('products/search', {
      params: {
        query: searchQuery.value
      }
    })
    products.value = data.data
    console.log(products.value)
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || 'Có lỗi xảy ra trong quá trình tạo sản phẩm.'
      console.log('Error response data:', error.response.data)
      console.log('Error status:', error.response.status)
      console.log('Error headers:', error.response.headers)
      toast.error(errorMessage, { timeout: 2000 })
    } else if (error.request) {
      console.log('No response received:', error.request)
      toast.error('Không nhận được phản hồi từ server.', { timeout: 2000 })
    } else {
      console.log('Request setup error:', error.message)
      toast.error('Lỗi trong quá trình thiết lập yêu cầu.', { timeout: 2000 })
    }
    console.log('Error config:', error.config)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchProducts()
})
watch(
  () => route.query.q,
  (newQ) => {
    if (newQ === '') return
    searchQuery.value = newQ
    fetchProducts()
  }
)
</script>
