<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Đặt lại mật khẩu</h2>
      <form @submit.prevent="submit(form)">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email của bạn
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mật khẩu mới
          </label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Nhập mật khẩu mới"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="password"
            id="password_confirmation"
            v-model="form.password_confirmation"
            placeholder="Xác nhận mật khẩu mới"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Đặt lại mật khẩu
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios/axios'
import { useToast } from 'vue-toastification'
const toast = useToast()
const route = useRoute()
const router = useRouter()
const form = reactive({
  token: route.query.token || '',
  email: route.query.email || '',
  password: '',
  password_confirmation: ''
})
const error = ref('')

const checkErrors = (data) => {
  // Kiểm tra email và định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    error.value = 'Vui lòng nhập email!'
    return false
  } else if (!emailPattern.test(data.email)) {
    error.value = 'Email không đúng định dạng!'
    return false
  }
  if (!data.password) {
    error.value = 'Vui lòng nhập mật khẩu!'
    return false
  } else if (data.password.length < 6) {
    error.value = 'Mật khẩu phải nhiều hơn 6 ký tự!'
    return false
  }
  if (!data.password_confirmation) {
    error.value = 'Vui lòng nhập đầy đủ mật khẩu!'
    return false
  }
  if (data.password !== data.password_confirmation) {
    error.value = 'Mật khẩu không khớp!'
    return false
  }
  error.value = ''
  return true
}
const submit = async (formData) => {
  if (!checkErrors(formData)) {
    toast.error(error.value, { timeout: 1500 })
    return
  }
  console.log(formData)
  try {
    await axios.post('reset-password', formData)
    toast.success('Reset password thành công!', { timeout: 1500 })
    router.push({ name: 'LoginMemberView' })
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || 'Có lỗi xảy ra trong quá trình đặt lại mật khẩu.'
      console.log('Error response data:', error.response.data)
      console.log('Error status:', error.response.status)
      console.log('Error headers:', error.response.headers)
      toast.error(errorMessage, { timeout: 2000 })
    } else if (error.request) {
      // Request đã được gửi nhưng không có phản hồi từ server
      console.log('No response received:', error.request)
      toast.error('Không nhận được phản hồi từ server.', { timeout: 2000 })
    } else {
      // Lỗi trong quá trình thiết lập request
      console.log('Request setup error:', error.message)
      toast.error('Lỗi trong quá trình thiết lập yêu cầu.', { timeout: 2000 })
    }
    console.log('Error config:', error.config)
  }
}
</script>
