<template>
  <div class="p-4">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Thêm danh mục mới</h2>
      <!-- Form Section -->
      <form @submit.prevent="createCategory(category)">
        <label class="block text-gray-700">Tên Danh Mục</label>
        <input
          type="text"
          placeholder="Nhập tên danh mục"
          v-model="category.name"
          class="mt-1 w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none"
        />
        <div class="mt-4">
          <label class="block text-gray-700 font-semibold mb-2">Hiển Thị</label>
          <select
            v-model="category.is_show"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="1">Hiện</option>
            <option value="0">Ẩn</option>
          </select>
        </div>
        <div class="mt-6 flex justify-end space-x-4">
          <button type="submit" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
            Thêm
          </button>
          <button class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">Hủy</button>
        </div>
      </form>
    </div>

    <!-- Action Buttons -->
  </div>
</template>

<script setup>
import useCategory from '@/composables/handleCategory'
const { category, createCategory } = useCategory()
</script>
