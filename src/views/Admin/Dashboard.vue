<template>
  <h3 class="py-5 shadow-lg text-center">Admin Dashboard</h3>

  <!-- Top Statistics Section -->
  <div class="grid grid-cols-4 gap-4 mb-8 mt-5 p-4">
    <!-- Đơn Hàng -->
    <div class="bg-red-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <!-- Icon Placeholder -->
          <i class="fas fa-wallet fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Đơn Hàng</h2>
          <p class="text-2xl">{{ statistics.ordersCount }}</p>
        </div>
      </div>
    </div>
    <!-- Tổng Doanh Thu -->
    <div class="bg-green-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <i class="fas fa-dollar-sign fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Tổng Doanh Thu</h2>
          <p class="text-2xl">{{ formatCurrency(statistics.totalRevenue) }}</p>
        </div>
      </div>
    </div>
    <!-- Sản Phẩm -->
    <div class="bg-blue-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <i class="fas fa-box fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Sản Phẩm</h2>
          <p class="text-2xl">{{ statistics.productsCount }}</p>
        </div>
      </div>
    </div>
    <!-- Báo Cáo -->
    <div class="bg-yellow-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <i class="fas fa-calendar-alt fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Báo Cáo</h2>
          <p class="text-2xl">12</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Orders Table Section -->
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="font-semibold text-lg mb-4">Đơn Hàng Cần Xác Nhận</h3>
    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="py-2 px-4">Mã Đơn Hàng</th>
          <th class="py-2 px-4">Khách Hàng</th>
          <th class="py-2 px-4">Ngày Đặt Hàng</th>
          <th class="py-2 px-4">Giỏ Hàng</th>
          <th class="py-2 px-4">Trạng Thái</th>
          <th class="py-2 px-4">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b text-center" v-for="item in pendingOrders" :key="item.id">
          <td class="py-2 px-4">{{ item.invoice_code }}</td>
          <td class="py-2 px-4">{{ item.user_name }}</td>
          <td class="py-2 px-4">{{ item.created_time }} {{ item.created_date }}</td>
          <td class="py-2 px-4">{{ item.product_count }} Sản Phẩm</td>
          <td class="py-2 px-4">
            <span class="bg-blue-500 text-white px-2 py-1 rounded-full">{{ item.status }}</span>
          </td>
          <td class="py-2 px-4">
            <router-link :to="{ name: 'order.detail', params: { orderId: item.id } }">
              <button class="bg-red-500 text-white py-2 px-3 rounded-lg mr-2">
                <i class="fas fa-eye"></i>
              </button>
            </router-link>
            <button
              @click="orderConfirm(item.id)"
              class="bg-blue-600 text-white py-2 px-3 rounded-lg mr-2"
            >
              <i class="fa-solid fa-check"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'orders' }" class="text-blue-500 mt-4 block"
      >Xem tất cả đơn hàng →</router-link
    >
  </div>
  <LoadingView v-if="isLoading" />
</template>

<script setup>
import LoadingView from '@/components/Loading/LoadingView.vue'
import axios from '@/axios/axios'
import useOrder from '@/composables/Admin/useOrders'
import { useCartStore } from '@/stores/useCartStore'
import { onMounted, ref } from 'vue'
const { formatCurrency } = useCartStore()
const statistics = ref({})
const isLoading = ref(true)
const { getPendingOrders, orderConfirm, pendingOrders } = useOrder()
const getStatistics = async () => {
  try {
    const { data } = await axios.get('admin/stats')
    statistics.value = data.data
    // console.log(data)
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  await Promise.all([getPendingOrders(), getStatistics()])
  isLoading.value = false
})
</script>
