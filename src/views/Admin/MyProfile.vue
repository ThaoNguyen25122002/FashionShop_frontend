<template>
  <div class="p-4">
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Thông Tin Admin</h2>
      <div class="flex space-x-6">
        <!-- Avatar Section -->
        <div class="w-1/3 flex flex-col items-center">
          <div
            class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
          >
            <img
              v-if="!infoAdmin.avatar"
              class="w-full h-full object-cover"
              src="@/assets/avatars/avatar.jpg"
              alt="avatar"
            />
            <img
              v-else
              class="w-full h-full object-cover"
              :src="imagePreview ? imagePreview : infoAdmin.avatar"
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
                v-model="infoAdmin.name"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Email</label>
              <input
                type="email"
                v-model="infoAdmin.email"
                disabled
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Số Điện Thoại</label>
              <input
                type="number"
                v-model="infoAdmin.phone"
                placeholder="Nhập số điện thoại"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-700">Chọn Tỉnh / Thành Phố</label>
              <input
                v-model="infoAdmin.city"
                type="text"
                placeholder="..."
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Quận/Huyện</label>
              <input
                type="text"
                v-model="infoAdmin.district"
                placeholder="..."
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Phường/Xã</label>
              <input
                type="text"
                v-model="infoAdmin.ward"
                placeholder="..."
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700">Nhập địa chỉ cụ thể</label>
            <input
              type="text"
              v-model="infoAdmin.street_address"
              placeholder="..."
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end space-x-4">
        <button type="submit" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Lưu Thông Tin
        </button>
      </div>
    </form>
  </div>
  <loading-view v-if="isLoading" />
</template>

<script setup>
import axios from '@/axios/axios'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import LoadingView from '@/components/Loading/LoadingView.vue'
import { useToast } from 'vue-toastification'
// import useLocation from '@/composables/locationService'
// const { getCities, cities } = useLocation()
const infoAdmin = ref({})
const isLoading = ref(false)
const imagePreview = ref(null)
const toast = useToast()
const handleFileChange = (e) => {
  infoAdmin.value.new_avatar = e.target.files[0]
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  imagePreview.value = URL.createObjectURL(infoAdmin.value.new_avatar)
}
const getInfoAdmin = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get('admin/profile')
    infoAdmin.value = data.data
    // console.log(infoAdmin.value)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  console.log(infoAdmin.value)

  try {
    const { data } = await axios.post('/admin/profile/update', infoAdmin.value, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('Lưu thành công!', { timeout: 2000 })
    // infoAdmin.value = data
    // console.log(infoAdmin.value)
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || 'Có lỗi xảy ra trong quá trình lưu thông tin.'
      console.log('Error response data:', error.response.data)
      console.log('Error status:', error.response.status)
      console.log('Error headers:', error.response.headers)
      toast.error(errorMessage, { timeout: 2000 })
    } else if (error.request) {
      console.log('No response received:', error.request)
      toast.error('Không nhận được phản hồi từ server.', { timeout: 2000 })
    } else {
      console.log('Request setup error:', error.message)
      toast.error('Lỗi trong quá trình thiết lập yêu cầu.', { timeout: 2000 })
    }
    console.log('Error config:', error.config)
  }
}

onMounted(() => {
  getInfoAdmin()
})

onBeforeUnmount(() => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
})
</script>
