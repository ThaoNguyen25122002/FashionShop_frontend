<template>
  <div class="p-8 bg-gray-50 rounded-xl shadow-lg">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Quản Lý Đơn Hàng</h1>

    <!-- Order Information Section -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6">Thông Tin Đơn Hàng</h2>

      <div class="grid grid-cols-2 gap-8">
        <!-- Customer Information -->
        <div>
          <h3 class="text-lg font-medium text-gray-600 mb-4">Thông Tin Khách Hàng</h3>
          <p class="text-gray-700 font-medium">{{ order.user_name }}</p>
          <p class="text-gray-500">
            {{ order.street_address }}, {{ order.ward }}, {{ order.district }}, {{ order.city }}
          </p>
          <p class="text-gray-500">{{ order.email }}</p>
          <p class="text-gray-500">{{ order.phone }}</p>
        </div>

        <!-- Order Status, Payment and Shipping -->
        <div class="text-right">
          <div class="mb-4">
            <span class="text-gray-600 text-sm">Mã đơn hàng: </span>
            <span class="font-semibold text-gray-800">{{ order.invoice_code }}</span>
          </div>
          <button
            class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition ease-in-out duration-150"
          >
            {{ order.status }}
          </button>
          <div class="mt-6">
            <p class="text-gray-500">
              Phương Thức Thanh Toán:
              <span class="font-semibold text-gray-700">Thanh Toán Khi Nhận Hàng</span>
            </p>
            <p class="text-gray-500">
              Phương Thức Vận Chuyển:
              <span class="font-semibold text-gray-700">Giao Hàng Tiết Kiệm</span>
            </p>
            <p class="text-gray-500">
              Ngày Đặt Hàng:
              <span class="font-semibold text-gray-700"
                >{{ order.created_time }} {{ order.created_date }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Status Change Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Thay Đổi Trạng Thái Đơn Hàng</h3>
      <select
        v-model="order.status"
        class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
      >
        <option value="pending">Chờ Xác Nhận</option>
        <option value="confirmed">Đã Xác Nhận</option>
        <option value="shipped">Đang Vận Chuyển</option>
        <option value="delivered">Đã Giao</option>
        <option value="cancelled">Đã Hủy</option>
      </select>
    </div>

    <!-- Product Information Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-700 mb-6">Thông Tin Sản Phẩm</h3>

      <!-- Product Table -->
      <table class="w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600">Ảnh</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600">Tên Sản Phẩm</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Giá</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Số Lượng</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          <!-- First Product -->
          <tr class="border-b" v-for="item in order.details" :key="item.id">
            <td class="py-3 px-4">
              <img class="w-16 h-16 object-cover rounded-md" :src="item.image" alt="Product 1" />
            </td>
            <td class="py-3 px-4">
              <div class="text-gray-800 font-medium">{{ item.name }}</div>
              <div class="text-sm text-gray-500">
                Kích Thước: {{ item.size }} | Màu Sắc: {{ item.color }}
              </div>
            </td>
            <td class="py-3 px-4 text-right text-gray-700">{{ formatCurrency(item.price) }}</td>
            <td class="py-3 px-4 text-right text-gray-700">{{ item.quantity }}</td>
            <td class="py-3 px-4 text-right text-gray-700">
              {{ formatCurrency(item.price * item.quantity) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-3 text-right">
        <span class="font-bold">Tổng Tiền: </span> {{ formatCurrency(order.total_amount) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import useOrder from '@/composables/Admin/useOrders'
import { useCartStore } from '@/stores/useCartStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const { formatCurrency } = useCartStore()
const { getOrderDetail, updateOrderStatus, order } = useOrder()
const route = useRoute()
const orderId = route.params.orderId
const flag = ref(true)
watch(
  () => order.value.status,
  () => {
    if (flag.value) {
      flag.value = false
    } else {
      // console.log(order.value.status)
      updateOrderStatus()
    }
  }
)
onMounted(async () => {
  getOrderDetail(orderId)
})
// Add any script logic if needed
</script>

<style scoped>
/* Custom styling can go here if required */
</style>
