<template>
  <div class="p-4">
    <form
      @submit.prevent="updateUser(user)"
      v-if="!isLoading"
      class="bg-white shadow-md rounded-lg p-6"
    >
      <h2 class="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Chỉnh Sửa Thông Tin</h2>
      <div class="flex space-x-6">
        <!-- Avatar Section -->
        <div class="w-1/3 flex flex-col items-center">
          <div
            class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
          >
            <img
              v-if="imagePreview"
              class="w-full h-full object-cover"
              :src="imagePreview"
              alt="avatar"
            />
            <img
              v-else
              class="w-full h-full object-cover"
              :src="user.avatar ? user.avatar : '/src/assets/avatars/avatar.jpg'"
              alt="avatar"
            />
          </div>
          <div class="mt-5">
            <label
              for="file-upload"
              class="mt-4 bg-white border border-red-500 text-red-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
            >
              Chọn Ảnh
            </label>
            <input id="file-upload" type="file" @change="handleFileChange" class="hidden" />
          </div>
        </div>

        <!-- Form Section -->
        <div class="w-2/3 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Họ Và Tên</label>
              <input
                type="text"
                v-model="user.name"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Email</label>
              <input
                type="email"
                v-model="user.email"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Số Điện Thoại</label>
              <input
                type="text"
                v-model="user.phone"
                class="mt-1 block w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-700">Chọn Tỉnh / Thành Phố</label>
              <input
                type="text"
                v-model="user.city"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Quận/Huyện</label>
              <input
                type="text"
                v-model="user.district"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Phường/Xã</label>
              <input
                type="text"
                v-model="user.ward"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700">Nhập địa chỉ cụ thể</label>
            <input
              type="text"
              v-model="user.street_address"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label class="block text-gray-700">Ủy Quyền</label>
            <select
              v-model="user.role"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option value="member">Tài Khoản Khách Hàng</option>
              <option value="admin">Tài Khoản Admin</option>
              <!-- Các tùy chọn khác -->
            </select>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end space-x-4">
        <button class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Lưu Thay Đổi
        </button>
        <button class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">Hủy</button>
      </div>
    </form>
    <LoadingView v-else />
  </div>
</template>

<script setup>
import LoadingView from '@/components/Loading/LoadingView.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useUserManagement from '@/composables/Admin/userManagement'
const { getUser, user, isLoading, updateUser } = useUserManagement()
const route = useRoute()
const userId = route.params.id
const imagePreview = ref(null)
const handleFileChange = (e) => {
  const file = e.target.files[0]
  user.value.newAvatar = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}
onMounted(() => {
  getUser(userId)
  // console.log(userId)
})
</script>
