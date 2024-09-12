<template>
  <!-- Header Section -->
  <div v-if="!isLoading" class="mt-[50px]">
    <div v-if="products.length > 0">
      <div class="text-center mx-auto max-w-[600px]">
        <h3 class="text-3xl text-primary font-bold mb-10">{{ categoryName }}</h3>
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
      <!-- <div class="text-center mx-auto py-10">
        <nav class="inline-flex shadow-sm">
          <button
            :disabled="pagination.current_page === 1"
            @click="
              pagination.current_page > 1 && getProductsByCategory(id, pagination.current_page - 1)
            "
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-l-lg"
          >
            Trước
          </button>
          <button
            v-for="page in pagination.last_page"
            :key="page"
            @click="getProductsByCategory(id, page)"
            :class="
              pagination.current_page === page ? 'bg-primary text-white' : 'bg-white text-gray-700'
            "
            class="border-t border-b border-gray-300 hover:bg-gray-200 px-3 py-1"
          >
            {{ page }}
          </button>

          <button
            :disabled="pagination.current_page === pagination.last_page"
            @click="
              pagination.current_page < pagination.last_page &&
                getProductsByCategory(id, pagination.current_page + 1)
            "
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-r-lg"
          >
            Sau
          </button>
        </nav>
      </div> -->
      <PaginationView
        :currentPage="pagination.current_page"
        :lastPage="pagination.last_page"
        @changePage="getProductsByCategory(id, $event)"
      />
    </div>
    <div v-else class="text-3xl text-primary font-bold h-screen text-center">
      <h1>Không có sản phẩm nào thuộc danh mục này!!!</h1>
    </div>
  </div>
  <LoadingView v-else />
</template>

<script setup>
import PaginationView from '@/components/Pagination/PaginationView.vue'
import ProductCard from '@/components/Member/Layouts/Cards/ProductCard.vue'
import LoadingView from '@/components/Loading/LoadingView.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/axios/axios'
import { useToast } from 'vue-toastification'
const route = useRoute()
const id = ref(route.params.id)
const toast = useToast()
const products = ref([])
const categoryName = ref('')
const isLoading = ref(false)
const pagination = ref({})
// console.log(id)

const getProductsByCategory = async (categoryId, page = 1) => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`category/${categoryId}/products?page=${page}`)
    // console.log(data.categoryName)
    categoryName.value = data.categoryName
    products.value = data.data.data
    pagination.value = data.data.meta
    console.log(pagination.value)
    // console.log(data.data.meta)
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || 'Có lỗi xảy ra trong quá trình lấy sản phẩm theo danh mục.'
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
watch(
  () => route.params.id,
  (newId) => {
    id.value = newId
    getProductsByCategory(id.value)
  }
)
onMounted(() => {
  getProductsByCategory(id.value)
})
</script>
