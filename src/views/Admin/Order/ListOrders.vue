<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <!-- Search Input -->
    <div class="flex justify-center items-center mb-6">
      <div class="relative w-full max-w-md">
        <input
          type="text"
          v-model="searchQuery"
          @keydown.enter="search"
          placeholder="Tìm kiếm đơn hàng..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm transition duration-300 ease-in-out"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-400 absolute left-3 top-2.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.9 14.32a8 8 0 111.42-1.42l4.38 4.38a1 1 0 01-1.42 1.42l-4.38-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <h1 class="text-2xl font-bold text-gray-700 mb-4">Quản Lý Đơn Hàng</h1>

    <div class="mt-6 overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-4">Mã Đơn Hàng</th>
            <th class="py-3 px-4">Người Đặt</th>
            <th class="py-3 px-4">Ngày Đặt</th>
            <th class="py-3 px-4">Trạng Thái</th>
            <th class="py-3 px-4">Thao Tác</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm">
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-4">{{ order.invoice_code }}</td>
            <td class="py-3 px-4">{{ order.user_name }}</td>
            <td class="py-3 px-4">{{ order.created_date }}</td>
            <td class="py-3 px-4">{{ order.status }}</td>
            <td class="py-3 px-4 flex space-x-2">
              <router-link
                :to="{ name: 'order.detail', params: { orderId: order.id } }"
                class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
              >
                Xem
              </router-link>
            </td>
          </tr>

          <!-- Các dòng khác -->
        </tbody>
      </table>
    </div>
    <!-- Phân trang -->
    <div class="mt-4 flex justify-between items-center" v-if="pagination.value">
      <div>
        <span class="text-sm text-gray-700">
          Hiển thị
          <span class="font-medium">1</span>
          đến
          <span class="font-medium">{{ pagination.value.last_page }}</span>
          của
          <span class="font-medium">{{ pagination.value.total }} </span>
          kết quả
        </span>
      </div>
      <div>
        <PaginationView
          :currentPage="pagination.value.current_page"
          :lastPage="pagination.value.last_page"
          @changePage="getOrders($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import useOrder from '@/composables/Admin/useOrders'
import { onMounted, ref } from 'vue'
import PaginationView from '@/components/Pagination/PaginationView.vue'
import axios from '@/axios/axios'
import { useToast } from 'vue-toastification'
const { getOrders, orders, pagination, searchOrders } = useOrder()
const searchQuery = ref('')
const toast = useToast()

const search = () => {
  if (searchQuery.value.trim() !== '') {
    searchOrders(searchQuery.value)
    console.log(searchQuery.value)
  } else {
    getOrders()
  }
}
onMounted(async () => {
  getOrders()
})
</script>
