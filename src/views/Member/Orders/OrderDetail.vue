<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-4">Chi Tiết Đơn Hàng</h2>

    <div class="mb-6">
      <p><strong>Mã Đơn Hàng:</strong> {{ orderDetails.invoice_code }}</p>
      <p><strong>Ngày Đặt Hàng:</strong> {{ orderDetails.created_date }}</p>
      <p><strong>Trạng Thái:</strong> {{ orderDetails.status }}</p>
      <p><strong>Tên Khách Hàng:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong>{{ user.email }}</p>
      <p><strong>Số Điện Thoại:</strong> {{ user.phone }}</p>
    </div>

    <h3 class="text-xl font-semibold mb-4">Giỏ Hàng</h3>

    <table class="w-full table-auto border-collapse mb-4">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2">STT</th>
          <th class="border px-4 py-2">Ảnh</th>
          <th class="border px-4 py-2">Sản Phẩm</th>
          <th class="border px-4 py-2">Giá</th>
          <th class="border px-4 py-2">Số Lượng</th>
          <th class="border px-4 py-2">Thành Tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orderDetails.details" :key="index">
          <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
          <td class="border px-4 py-2 text-center">
            <img :src="item.image" alt="Product Image" class="size-16 object-cover" />
          </td>
          <td class="border px-4 py-2">
            {{ item.name }}<br />
            <span class="text-sm text-gray-500">Kích thước: {{ item.size }}</span
            ><br />
            <span class="text-sm text-gray-500">Màu sắc: {{ item.color }}</span>
          </td>
          <td class="border px-4 py-2 text-red-500 text-center">
            {{ formatCurrency(item.price) }}
          </td>
          <td class="border px-4 py-2 text-center">{{ item.quantity }}</td>
          <td class="border px-4 py-2 text-right">
            {{ formatCurrency(item.quantity * item.price) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-right">
      <!-- <p><strong>Giảm Giá:</strong> 89,600đ</p> -->
      <p class="text-xl font-semibold">
        <strong>Tổng Tiền:</strong> {{ formatCurrency(orderDetails.total_amount) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/axios/axios'
import { useToast } from 'vue-toastification'
import { useCartStore } from '@/stores/useCartStore'
const { formatCurrency } = useCartStore()
const route = useRoute()
const toast = useToast()
const user = ref(JSON.parse(localStorage.getItem('user')) || null)
const orderId = route.params.orderId
const orderDetails = ref({})
const getOrderDetail = async (id) => {
  try {
    const { data } = await axios.get(`order/${id}/details`)
    orderDetails.value = data.data
    console.log(orderDetails.value)

    // router.push({ name: 'HomeView' })
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || 'Có lỗi xảy ra trong quá trình xem chi tiết đơn hàng!.'
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
  }
}

onMounted(() => {
  getOrderDetail(orderId)
})
</script>
