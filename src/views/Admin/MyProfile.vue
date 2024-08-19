<template>
  <div class="max-w-lg mx-auto p-6 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg">
    <div class="flex flex-col items-center mb-6">
      <div class="relative">
        <img
          v-if="profile.avatar"
          :src="profile.avatar"
          alt="Avatar"
          class="w-28 h-28 rounded-full shadow-md"
        />
        <div
          v-else
          class="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl"
        >
          No Image
        </div>
        <button
          v-if="isEditing"
          @click="uploadAvatar"
          class="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12l7-7 7 7M5 19l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="!isEditing" class="space-y-4 w-full">
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <p class="font-semibold text-gray-700">Tên:</p>
        <p class="text-gray-600">{{ profile.name }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <p class="font-semibold text-gray-700">Số điện thoại:</p>
        <p class="text-gray-600">{{ profile.phone }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <p class="font-semibold text-gray-700">Email:</p>
        <p class="text-gray-600">{{ profile.email }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <p class="font-semibold text-gray-700">Địa chỉ:</p>
        <p class="text-gray-600">{{ fullAddress }}</p>
      </div>
      <button
        @click="isEditing = true"
        class="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Chỉnh sửa thông tin
      </button>
    </div>

    <form v-else class="space-y-4">
      <input type="file" />
      <input
        v-model="editProfile.name"
        type="text"
        placeholder="Tên"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        v-model="editProfile.phone"
        type="text"
        placeholder="Số điện thoại"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        v-model="editProfile.email"
        type="text"
        placeholder="Email"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        v-model="editProfile.city"
        type="text"
        placeholder="Thành phố"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        v-model="editProfile.district"
        type="text"
        placeholder="Quận"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        v-model="editProfile.ward"
        type="text"
        placeholder="Phường"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        v-model="editProfile.specificAddress"
        type="text"
        placeholder="Địa chỉ cụ thể"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        @click="updateProfile"
        class="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Cập nhật
      </button>
      <button
        @click="cancelEdit"
        class="w-full bg-gray-400 text-white py-2 rounded-lg shadow-md hover:bg-gray-500 transition"
      >
        Hủy bỏ
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const profile = ref({
  avatar: null,
  name: 'Thảo Nguyễn',
  phone: '0123456789',
  email: 'email@example.com',
  city: 'TP. Hồ Chí Minh',
  district: 'Quận 1',
  ward: 'Phường Bến Nghé',
  specificAddress: '123 Đường ABC'
})

const isEditing = ref(false)

const editProfile = ref({ ...profile.value })

const fullAddress = computed(() => {
  return `${profile.value.specificAddress}, ${profile.value.ward}, ${profile.value.district}, ${profile.value.city}`
})

const updateProfile = () => {
  profile.value = { ...editProfile.value }
  isEditing.value = false
}

const cancelEdit = () => {
  editProfile.value = { ...profile.value }
  isEditing.value = false
}

// const uploadAvatar = () => {

//   alert('Upload avatar logic here!')
// }
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh nếu cần */
</style>
