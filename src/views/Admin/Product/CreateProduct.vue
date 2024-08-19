<template>
  <div class="p-4">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Thêm Sản Phẩm Mới</h2>
      <div class="flex">
        <!-- Form Section -->
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Tên Sản Phẩm</label>
              <input
                type="text"
                value="Trần Công Minh"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Loại Sản Phẩm</label>
              <select
                class="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                name="mySelect"
              >
                <option class="py-2" value="value1">Text 1</option>
                <option class="py-2" value="value2">Text 2</option>
                <option class="py-2" value="value3">Text 3</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Giá</label>
              <input
                type="text"
                value=""
                class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label class="block text-gray-700">Tùy chọn sản phẩm</label>
              <select
                class="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                name="mySelect"
              >
                <option class="py-2" value="value1">Mặc Định</option>
                <option class="py-2" value="value2">Sale</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label class="block text-gray-700">Ảnh</label>
              <input
                type="file"
                multiple
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          <div v-for="(row, index) in rows" :key="index" class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-700">Màu Sắc</label>
              <input
                type="text"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Kích Thước</label>
              <input
                type="text"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Số Lượng</label>
              <input
                type="number"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          <div>
            <button @click="addRow" class="px-4 py-1 text-white bg-red-500 rounded-lg">
              Thêm +
            </button>
          </div>
          <div>
            <label class="block text-gray-700">Mô Tả</label>
            <input
              type="text"
              value=""
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-start space-x-4">
        <button class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Thêm người dùng
        </button>
        <button class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const rows = reactive([{ color: '', size: '', quantity: 1 }])

function addRow() {
  rows.push({ color: '', size: '', quantity: 1 })
}
</script>
