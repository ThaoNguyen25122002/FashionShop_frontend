<template>
  <!-- Main Container -->
  <div class="container mx-auto p-6">
    <!-- Breadcrumbs -->
    <nav class="text-sm mb-6">
      <ol class="flex items-center space-x-4">
        <li><a href="#" class="text-gray-500">Giỏ Hàng</a></li>
        <li class="text-gray-500">&rarr;</li>
        <li class="text-red-500">Đặt Hàng</li>
        <li class="text-gray-500">&rarr;</li>
        <li class="text-gray-500">Hoàn Thành Đơn Hàng</li>
      </ol>
    </nav>

    <!-- Checkout Form -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Shipping Address -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Địa Chỉ Giao Hàng</h2>

        <form action="#">
          <div class="mb-4">
            <label class="block text-gray-700">Họ Và Tên</label>
            <input
              type="text"
              v-model="user.name"
              class="w-full border border-gray-300 rounded-lg p-2"
              placeholder="..."
              disabled
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input
              type="email"
              v-model="user.email"
              disabled
              class="w-full border border-gray-300 rounded-lg p-2"
              placeholder="..."
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Số Điện Thoại</label>
            <input
              type="text"
              disabled
              v-model="user.phone"
              class="w-full border border-gray-300 rounded-lg p-2"
              placeholder="..."
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-gray-700">Chọn tỉnh / thành phố</label>
              <input
                type="text"
                disabled
                placeholder="..."
                v-model="user.city"
                class="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label class="block text-gray-700">Chọn quần / huyện</label>
              <input
                type="text"
                disabled
                v-model="user.district"
                placeholder="..."
                class="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label class="block text-gray-700">Chọn phường / xã</label>
              <input
                type="text"
                disabled
                v-model="user.ward"
                placeholder="..."
                class="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Nhập chỉ cụ thể</label>
            <input
              type="text"
              disabled
              v-model="user.street_address"
              class="w-full border border-gray-300 rounded-lg p-2"
              placeholder="..."
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Ghi Chú Đơn Hàng</label>
            <textarea
              v-model="user.note"
              class="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Ghi chú..."
            ></textarea>
          </div>
        </form>
      </div>

      <!-- Order Summary -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Đơn Hàng</h2>

        <div class="border-b border-gray-200 pb-4 mb-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-700">Tạm Tính</span>
            <span class="text-gray-700">{{ store.formatCurrency(store.cartTotal) }}</span>
          </div>
          <div class="flex items-center justify-between mb-2">
            <input
              type="text"
              class="w-1/2 border border-gray-300 rounded-lg p-2"
              placeholder="Mã giảm giá"
            />
            <button class="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg">Áp dụng</button>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-700">Giảm Giá</span>
            <span class="text-gray-700">89,600đ</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-700">Phí Vận Chuyển</span>
            <span class="text-gray-700">Miễn Phí</span>
          </div>
          <div class="flex justify-between items-center mb-2 mt-5">
            <span class="text-black font-semibold text-lg">Phương thức thanh toán:</span>
            <span class="text-gray-700">Thanh toán khi nhận hàng</span>
          </div>
        </div>

        <div class="flex justify-between mb-4">
          <span class="text-red-500 font-bold text-lg">Tổng Tiền</span>
          <span class="text-red-500 font-bold text-lg">{{
            store.formatCurrency(store.cartTotal)
          }}</span>
        </div>

        <button @click="checkout(user)" class="w-full bg-red-500 text-white py-3 rounded-lg">
          Hoàn Thành Đơn Hàng
        </button>
      </div>
    </div>
    <div class="bg-white mt-6 p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Chi Tiết Sản Phẩm</h2>

      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="text-left py-2 px-4 border-b-2">STT</th>
            <th class="text-left py-2 px-4 border-b-2">Ảnh</th>
            <th class="text-left py-2 px-4 border-b-2">Sản Phẩm</th>
            <th class="text-left py-2 px-4 border-b-2">Giá</th>
            <th class="text-left py-2 px-4 border-b-2">Số Lượng</th>
            <th class="text-left py-2 px-4 border-b-2">Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="(item, index) in store.cartItems" :key="index">
            <td class="py-4 px-4">{{ index + 1 }}</td>
            <td class="py-4 px-4">
              <img :src="item.image" alt="product" class="w-16 h-16 object-cover" />
            </td>
            <td class="py-4 px-4">
              {{ item.name }}<br />
              Kích thước: {{ item.size }}<br />
              Màu sắc: {{ item.color }}
            </td>
            <td class="py-4 px-4">{{ store.formatCurrency(item.price) }}</td>
            <td class="py-4 px-4">{{ item.quantity }}</td>
            <td class="py-4 px-4">{{ store.formatCurrency(item.price * item.quantity) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import axios from '@/axios/axios'
import { useRouter } from 'vue-router'
const toast = useToast()
const errors = ref('')
const router = useRouter()
const store = useCartStore()
const user = ref(JSON.parse(localStorage.getItem('user')))
const order = ref({
  userId: user.value.id,
  order: store.cartItems
})
const checkErrors = (data) => {
  console.log(data)
  // Kiểm tra email và định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email) {
    errors.value = 'Vui lòng nhập email!'
    return false
  } else if (!emailPattern.test(data.email)) {
    errors.value = 'Email không hợp lệ!'
    return false
  }
  if (!data.phone) {
    errors.value = 'Vui lòng nhập số điện thoại!'
    return false
  }
  if (!data.city) {
    errors.value = 'Vui lòng nhập tỉnh/thành phố!'
    return false
  }
  if (!data.district) {
    errors.value = 'Vui lòng nhập quận/huyện!'
    return false
  }
  if (!data.ward) {
    errors.value = 'Vui lòng nhập phường/xã!'
    return false
  }
  if (!data.street_address) {
    errors.value = 'Vui lòng nhập số nhà!'
    return false
  }
  errors.value = ''
  return true
}

const checkout = async (info) => {
  if (!checkErrors(info)) {
    toast.error(errors.value, { timeout: 1500 })
  }
  const order = {
    userId: user.value.id,
    order: store.cartItems,
    totalAmount: store.cartTotal
  }

  // console.log(store.cartItems)
  try {
    const { data } = await axios.post('order/create', order)
    // console.log(order)
    localStorage.setItem('cart', [])
    store.cartItems = []
    router.push({ name: 'HomeView' })

    toast.success('Đặt hàng thành công!')
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || 'Có lỗi xảy ra trong quá trình đặt hàng.'
      console.log('Error response data:', error.response.data)
      console.log('Error status:', error.response.status)
      console.log('Error headers:', error.response.headers)
      toast.error(errorMessage, { timeout: 2000 })
    } else if (error.request) {
      // Request đã được gửi nhưng không có phản hồi từ server
      console.log('No response received:', error.request)
      toast.error('Không nhận được phản hồi từ server.', { timeout: 2000 })
    } else {
      // Lỗi trong quá trình thiết lập request
      console.log('Request setup error:', error.message)
      toast.error('Lỗi trong quá trình thiết lập yêu cầu.', { timeout: 2000 })
    }
    console.log('Error config:', error.config)
  }
}
console.log(user.value)
</script>
