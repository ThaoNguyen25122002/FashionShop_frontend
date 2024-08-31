<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register(formData)">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tên</label
              >
              <input
                type="text"
                name="name"
                v-model="formData.name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tên..."
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email</label
              >
              <input
                type="text"
                name="email"
                v-model="formData.email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập email..."
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mật khẩu</label
              >
              <input
                type="password"
                name="password"
                v-model="formData.password"
                id="password"
                placeholder="Nhập mật khẩu"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nhập lại mật khẩu</label
              >
              <input
                type="password"
                name="confirm-password"
                v-model="formData.password_confirmation"
                id="confirm-password"
                placeholder="Nhập lại mật khẩu"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-[#3b82f6] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#bfdbfe] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link to="login" class="font-medium text-[#3b82f6] hover:underline"
                >Login here</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import axios from '@/axios/axios'
import { useRouter } from 'vue-router'
const toast = useToast()
const errors = ref('')
const router = useRouter()
const formData = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const checkErrors = (data) => {
  console.log(data)
  if (!data.name) {
    errors.value = 'Vui lòng nhập tên !'
    return false
  }
  // Kiểm tra email và định dạng email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email) {
    errors.value = 'Vui lòng nhập email!'
    return false
  } else if (!emailPattern.test(data.email)) {
    errors.value = 'Email không hợp lệ!'
    return false
  }
  if (!data.password) {
    errors.value = 'Vui lòng nhập mật khẩu!'
    return false
  }
  if (!data.password_confirmation) {
    errors.value = 'Vui lòng nhập mật khẩu!'
    return false
  }
  if (data.password !== data.password_confirmation) {
    errors.value = 'Mật khẩu không khớp!'
    return false
  }
  errors.value = ''
  return true
}
const register = async (data) => {
  if (!checkErrors(data)) {
    toast.error(errors.value)
    return
  }
  try {
    await axios.post('register', data)
    toast.success('Đăng ký thành công!!')
    router.push({ name: 'LoginMemberView' })
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || 'Có lỗi xảy ra trong quá trình đăng ký!.'
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
</script>
