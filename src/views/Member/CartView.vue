<template>
  <div
    v-if="store.cartItems.length"
    class="container w-full mx-auto mt-10 p-10 bg-white shadow-2xl rounded-lg"
  >
    <!-- Bảng giỏ hàng -->
    <table class="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead class="bg-primary text-white">
        <tr>
          <th class="py-4 px-4 text-left font-semibold">Ảnh</th>
          <th class="py-4 px-4 text-left font-semibold">Sản Phẩm</th>
          <th class="py-4 px-4 text-right font-semibold">Giá</th>
          <th class="py-4 px-4 text-center font-semibold">Số Lượng</th>
          <th class="py-4 px-4 text-right font-semibold">Thành Tiền</th>
          <th class="py-4 px-4 text-center font-semibold">Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in store.cartItems" :key="index" class="border-t">
          <td class="py-4 px-4">
            <img
              :src="item.image"
              alt="product image"
              class="w-20 h-20 object-cover rounded-lg mx-auto border border-gray-300"
            />
          </td>
          <td class="py-4 px-4 text-gray-800 font-medium">
            <div>{{ item.name }}</div>
            <div class="text-gray-500 text-sm">Màu sắc: {{ item.color }}</div>
            <div class="text-gray-500 text-sm">Kích thước: {{ item.size }}</div>
          </td>
          <td class="py-4 px-4 text-right text-gray-800">{{ store.formatCurrency(item.price) }}</td>
          <td class="py-4 px-4 text-center">
            <button
              @click="store.decreaseQuantity(index)"
              class="px-3 py-1 bg-secondary text-white rounded-md hover:bg-opacity-90"
            >
              &minus;
            </button>
            <span class="mx-4 font-semibold text-gray-800">{{ item.quantity }}</span>
            <button
              @click="store.increaseQuantity(index)"
              class="px-3 py-1 bg-secondary text-white rounded-md hover:bg-opacity-90"
            >
              &#43;
            </button>
          </td>
          <td class="py-4 px-4 text-right text-gray-800 font-semibold">
            {{ store.formatCurrency(item.price * item.quantity) }}
          </td>
          <td class="py-4 px-4 text-center">
            <button
              @click="store.removeItem(index)"
              class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              &#10005;
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phần áp dụng coupon và tổng tiền -->
    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <label for="coupon" class="block text-lg font-medium text-gray-700">Coupon Code</label>
        <div class="flex mt-3">
          <input
            type="text"
            v-model="coupon"
            id="coupon"
            class="form-input w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          />
          <button
            @click="applyCoupon"
            class="ml-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
          >
            Apply
          </button>
        </div>
      </div>
      <div class="md:col-span-1 bg-gray-50 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-gray-700">Đơn Hàng</h2>
        <div class="flex justify-between mt-4">
          <span class="text-gray-600">Subtotal:</span>
          <span class="text-gray-800 font-semibold">{{
            store.formatCurrency(store.cartTotal)
          }}</span>
        </div>
        <div class="flex justify-between mt-4">
          <span class="text-gray-600">Discount:</span>
          <span class="text-gray-800 font-semibold">-{{}}</span>
        </div>
        <div class="flex justify-between mt-4 border-t pt-4">
          <span class="text-gray-700 font-semibold">Total:</span>
          <span class="text-gray-900 font-bold">{{}}</span>
        </div>
        <button
          @click="checkout"
          class="w-full mt-6 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
  <div v-else class="py-[300px]">
    <h4 class="text-secondary font-semibold text-2xl text-center">Giỏ hàng rỗng!!!</h4>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/useCartStore'
import { ref } from 'vue'

const store = useCartStore()
console.log(store.cartItems)

const coupon = ref('')

const checkout = () => {
  alert('Đã chuyển tới trang thanh toán')
}
</script>

<style scoped>
.table-auto {
  width: 100%;
}
.form-input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
}
.bg-primary {
  background-color: #fea928;
}
.bg-secondary {
  background-color: #ed8900;
}
</style>
