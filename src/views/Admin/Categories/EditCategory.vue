<template>
  <div class="p-4">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Thêm danh mục mới</h2>
      <!-- Form Section -->
      <form @submit.prevent="updateCategory(category)">
        <div class="mb-6">
          <label class="block text-gray-700 font-semibold mb-2">Tên Danh Mục</label>
          <input
            type="text"
            v-model="category.name"
            placeholder="Nhập tên danh mục"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Hiển Thị</label>
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="1">Hiện</option>
              <option value="0">Ẩn</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Sắp Xếp</label>
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="2">Cao</option>
              <option value="1">Trung Bình</option>
              <option value="0">Thấp</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cập nhật
          </button>
          <router-link
            :to="{ name: 'category' }"
            class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Hủy
          </router-link>
        </div>
      </form>
    </div>
    <loading-view v-if="isLoading" />

    <!-- Action Buttons -->
  </div>
</template>

<script setup>
import useCategory from '@/composables/handleCategory'
import LoadingView from '@/components/Loading/LoadingView.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const { updateCategory, getCategory, category, isLoading } = useCategory()
const route = useRoute()
const categoryId = route.params.id

onMounted(() => {
  getCategory(categoryId)
})
</script>
