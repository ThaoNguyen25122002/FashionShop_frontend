<template>
  <div class="container py-6 h-svh" v-if="!isLoading">
    <h2 class="text-2xl font-semibold text-center mb-4">Đơn Hàng Của Bạn</h2>
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2 text-left">Mã Đơn Hàng</th>
          <th class="border px-4 py-2 text-left">Ngày Đặt Hàng</th>
          <th class="border px-4 py-2 text-left">Trạng Thái</th>
          <th class="border px-4 py-2 text-left">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="border px-4 py-2">{{ order.invoice_code }}</td>
          <td class="border px-4 py-2">{{ order.created_time }} / {{ order.created_date }}</td>
          <td class="border px-4 py-2">{{ order.status }}</td>
          <td class="border px-4 py-2">
            <router-link
              :to="{ name: 'OrderDetailMember', params: { orderId: order.id } }"
              class="bg-red-500 text-white px-4 py-2 rounded"
              >Chi Tiết</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationView
      v-if="pagination && pagination.current_page && pagination.last_page"
      :currentPage="pagination.current_page"
      :lastPage="pagination.last_page"
      @changePage="getOrders($event)"
    />
  </div>
  <LoadingView v-else />
</template>
<script setup>
import axios from '@/axios/axios'
import { onMounted, ref } from 'vue'
import PaginationView from '@/components/Pagination/PaginationView.vue'
import LoadingView from '@/components/Loading/LoadingView.vue'
const orders = ref([])
const pagination = ref({})
const isLoading = ref(false)
const getOrders = async (page = 1) => {
  try {
    isLoading.value = true
    const { data } = await axios.get(`orders?page=${page}`)
    // console.log(data.data)
    orders.value = data.data
    pagination.value = data.meta
    // console.log(pagination.value)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getOrders()
})
</script>
