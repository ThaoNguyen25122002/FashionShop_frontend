<template>
  <div class="container mx-auto p-4" v-if="!isLoading">
    <div class="flex flex-col lg:flex-row">
      <!-- Hình ảnh sản phẩm -->
      <div class="w-full lg:w-1/2">
        <div class="grid grid-cols-1 gap-4">
          <img :src="product.images?.[0]?.image_url" alt="Main Product Image" class="rounded-lg" />
        </div>
      </div>

      <!-- Chi tiết sản phẩm -->
      <div class="w-full lg:w-1/2 lg:pl-8">
        <h2 class="text-2xl font-bold">{{ product.name }}</h2>
        <div class="flex items-center space-x-2 my-2">
          <p>{{ product.description }}</p>
        </div>
        <div class="text-red-500 text-2xl font-semibold">
          {{ store.formatCurrency(product.price) }}
        </div>
        <div class="my-4 border-b"></div>

        <!-- Tùy chọn sản phẩm -->
        <div class="my-4">
          <label class="block text-gray-700">Chọn loại Size - Màu</label>
          <select v-model="selectedVariant" class="mt-2 w-full border rounded-md p-2">
            <option v-for="(variant, index) in product.variations" :key="index" :value="variant">
              {{ variant.color }} - {{ variant.size }}
            </option>
          </select>
        </div>

        <!-- Số lượng sản phẩm -->
        <div class="flex items-center space-x-4">
          <label class="block text-gray-700">Số Lượng</label>
          <div class="flex items-center border rounded-md">
            <button
              @click="decreaseQuantity"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md"
            >
              -
            </button>
            <input
              v-model.number="quantity"
              type="number"
              min="1"
              class="w-12 text-center border-none focus:ring-0"
            />
            <button
              @click="increaseQuantity"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md"
            >
              +
            </button>
          </div>
        </div>

        <!-- Hướng dẫn kích thước -->
        <div class="my-4">
          <a href="#" class="text-blue-500 underline">Hướng Dẫn Chọn Kích Thước</a>
        </div>

        <!-- Nút hành động -->
        <div class="flex space-x-4 my-4">
          <button
            @click="handleAddToCart"
            class="flex-1 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Thêm Vào Giỏ Hàng
          </button>
          <button class="flex-1 py-3 bg-gray-200 rounded-md hover:bg-gray-300">Yêu Thích</button>
        </div>
      </div>
    </div>
  </div>
  <LoadingView v-else />
</template>

<script setup>
import axios from '@/axios/axios'
import { onMounted, ref } from 'vue'
import LoadingView from '@/components/Loading/LoadingView.vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'
import { useToast } from 'vue-toastification'
const toast = useToast()
const store = useCartStore()
const route = useRoute()
const productId = route.params.id
const isLoading = ref(false)
const product = ref({})
const quantity = ref(1)
const selectedVariant = ref(null)
const getProduct = async (id) => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/product/${id}/detail`)
    product.value = data.data
    // console.log(product.value)
    // console.log(product.value.images[0].image_url)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
const handleAddToCart = () => {
  if (selectedVariant.value && selectedVariant.value.quantity < quantity.value) {
    toast.error(
      'Số lượng hàng trong kho chỉ còn ' + selectedVariant.value.quantity + ' sản phẩm!',
      { timeout: 1500 }
    )
  } else if (selectedVariant.value) {
    const cartItem = {
      id: product.value.id,
      name: product.value.name,
      image: product.value.images[0].image_url,
      price: product.value.price,
      color: selectedVariant.value.color,
      size: selectedVariant.value.size,
      quantity: quantity.value
    }
    // console.log('Added to cart:', cartItem)
    store.addToCart(cartItem)
    toast.success('Đã thêm vào giỏ hàng!', { timeout: 1500 })
  } else {
    toast.error('Vui lòng chọn size và màu sản phẩm!!!')
  }
}
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value -= 1
}

const increaseQuantity = () => {
  quantity.value += 1
}
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}
onMounted(() => {
  getProduct(productId)
})
</script>
