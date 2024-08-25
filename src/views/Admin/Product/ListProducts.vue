<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <h1 class="text-2xl font-bold text-gray-700 mb-4">Quản Lý Sản Phẩm</h1>
    <router-link
      to="user/create"
      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Thêm Người Dùng Mới +
    </router-link>
    <div class="mt-6 overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-4">Ảnh</th>
            <th class="py-3 px-4">Tên Sản Phẩm</th>
            <th class="py-3 px-4">Tồn kho</th>
            <th class="py-3 px-4">Giá</th>
            <th class="py-3 px-4">Flash Sale</th>

            <th class="py-3 px-4">Thao Tác</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm">
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-1 px-2 h-5 w-10">
              <div class="h-full w-full">
                <img
                  class="h-full w-full object-cover rounded-md"
                  :src="product.images[0].image_url"
                  alt="Women"
                />
              </div>
            </td>
            <td class="py-3 px-4">{{ product.name }}</td>
            <td class="py-3 px-4">{{ product.sum_qty }}</td>
            <td class="py-3 px-4">
              <span>{{ product.price }}</span
              >VND
            </td>
            <td class="py-3 px-4">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" />
            </td>
            <td class="py-3 px-4 flex space-x-2">
              <router-link
                :to="{ name: 'product.edit', params: { id: product.id } }"
                class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </router-link>
              <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600">
                <i class="fa-solid fa-x"></i>
              </button>
            </td>
          </tr>

          <!-- Các dòng khác -->
        </tbody>
      </table>
    </div>
    <!-- Phân trang -->
    <div class="mt-4 flex justify-between items-center">
      <div>
        <span class="text-sm text-gray-700">
          Hiển thị
          <span class="font-medium">1</span>
          đến
          <span class="font-medium">10</span>
          của
          <span class="font-medium">50</span>
          kết quả
        </span>
      </div>
      <div>
        <nav class="inline-flex shadow-sm">
          <button
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-l-lg"
          >
            Trước
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            1
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            2
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            3
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            4
          </button>
          <button
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-r-lg"
          >
            Sau
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import useProduct from '@/composables/Admin/products'
import { onMounted } from 'vue'
const { products, getProducts } = useProduct()
onMounted(() => {
  getProducts()
})
</script>
