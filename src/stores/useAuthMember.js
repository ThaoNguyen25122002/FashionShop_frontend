import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios/axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export const useAuthMemberStore = defineStore('authMember', () => {
  const user = ref(null)
  const router = useRouter()
  const toast = useToast()
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const isLoggedIn = ref(false)
  const userName = ref('')
  const errors = ref('')
  const checkLoginErrors = (data) => {
    console.log(data)
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
    errors.value = ''
    return true
  }
  const login = async (formData) => {
    if (!checkLoginErrors(formData)) {
      toast.error(errors.value)
      return
    }
    // console.log(data)

    try {
      const { data } = await axios.post('login', formData)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      isLoggedIn.value = true
      userName.value = data.user.name
      router.push({ name: 'HomeView' })
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình đăng nhập.'
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
  const logout = async () => {
    try {
      const { data } = await axios.post('logout')
      isLoggedIn.value = false
      userName.value = ''
      localStorage.clear()
      router.push({ name: 'LoginMemberView' })
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message, { timeout: 2000 })
    }
  }
  return { user, login, logout, isLoggedIn, userName }
})
