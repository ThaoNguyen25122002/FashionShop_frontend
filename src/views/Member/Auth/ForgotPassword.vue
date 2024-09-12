<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submit(email)">
          <h3 class="text-center text-3xl font-bold">Quên mật khẩu</h3>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                v-model="email"
                type="text"
                autocomplete="email"
                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '@/axios/axios'
import { useAuthMemberStore } from '@/stores/useAuthMember'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()
const email = ref('')
const message = ref('')
const error = ref('')
const checkEmail = (data) => {
  // Kiểm tra email và định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (data === '') {
    error.value = 'Vui lòng nhập email!'
    return false
  } else if (!emailPattern.test(data)) {
    error.value = 'Email không hợp lệ!'
    return false
  }

  error.value = ''
  return true
}
const submit = async (form) => {
  if (!checkEmail(form)) {
    toast.error(error.value)
    return
  }
  try {
    await axios.post('forgot-password', { email: form })
    toast.success('Vui lòng check email để reset password!!')
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || 'Có lỗi xảy ra trong quá trình send mail.'
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
