<template>
  <div class="container w-full mx-auto mt-10 p-10 bg-white shadow-2xl rounded-lg">
    <!-- Bảng giỏ hàng -->
    <table class="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead class="bg-primary text-white">
        <tr>
          <th class="py-4 px-4 text-left font-semibold">Products</th>
          <th class="py-4 px-4 text-left font-semibold">Name</th>
          <th class="py-4 px-4 text-right font-semibold">Price</th>
          <th class="py-4 px-4 text-center font-semibold">Quantity</th>
          <th class="py-4 px-4 text-right font-semibold">Total</th>
          <th class="py-4 px-4 text-center font-semibold">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index" class="border-t">
          <td class="py-4 px-4">
            <img
              src="../../assets/women/women4.jpg"
              alt="product image"
              class="w-20 h-20 object-cover rounded-lg mx-auto border border-gray-300"
            />
          </td>
          <td class="py-4 px-4 text-gray-800 font-medium">{{ item.name }}</td>
          <td class="py-4 px-4 text-right text-gray-800">{{ formatCurrency(item.price) }}</td>
          <td class="py-4 px-4 text-center">
            <button
              @click="decreaseQuantity(index)"
              class="px-3 py-1 bg-secondary text-white rounded-md hover:bg-opacity-90"
            >
              &minus;
            </button>
            <span class="mx-4 font-semibold text-gray-800">{{ item.quantity }}</span>
            <button
              @click="increaseQuantity(index)"
              class="px-3 py-1 bg-secondary text-white rounded-md hover:bg-opacity-90"
            >
              &#43;
            </button>
          </td>
          <td class="py-4 px-4 text-right text-gray-800 font-semibold">
            {{ formatCurrency(item.price * item.quantity) }}
          </td>
          <td class="py-4 px-4 text-center">
            <button
              @click="removeItem(index)"
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
        <h2 class="text-xl font-semibold text-gray-700">Cart Total</h2>
        <div class="flex justify-between mt-4">
          <span class="text-gray-600">Subtotal:</span>
          <span class="text-gray-800 font-semibold">{{ formatCurrency(subtotal) }}</span>
        </div>
        <div v-if="discount > 0" class="flex justify-between mt-4">
          <span class="text-gray-600">Discount:</span>
          <span class="text-gray-800 font-semibold">-{{ formatCurrency(discount) }}</span>
        </div>
        <div class="flex justify-between mt-4 border-t pt-4">
          <span class="text-gray-700 font-semibold">Total:</span>
          <span class="text-gray-900 font-bold">{{ formatCurrency(total) }}</span>
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
</template>

<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
  { name: 'Big Banana', price: 2.99, quantity: 4, image: 'banana.jpg' },
  { name: 'Potatoes', price: 2.99, quantity: 1, image: 'potato.jpg' },
  { name: 'Awesome Broccoli', price: 2.99, quantity: 1, image: 'broccoli.jpg' }
])

const coupon = ref('')
const discount = ref(0)

const subtotal = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
)

const total = computed(() => subtotal.value - discount.value)

const formatCurrency = (value) => `${value.toFixed(2)} $`

const increaseQuantity = (index) => {
  cartItems.value[index].quantity++
}

const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--
  }
}

const removeItem = (index) => {
  cartItems.value.splice(index, 1)
}

const applyCoupon = () => {
  if (coupon.value === 'DISCOUNT10') {
    discount.value = subtotal.value * 0.1
  } else {
    alert('Coupon không hợp lệ')
    discount.value = 0
  }
}

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
