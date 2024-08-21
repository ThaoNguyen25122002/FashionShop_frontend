import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios/axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const router = useRouter()
  const toast = useToast()
  const saveUserData = (data) => {
    user.value = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const login = async (form) => {
    try {
      const { data } = await axios.post('admin/login', form)
      saveUserData(data)
      router.push({ name: 'Dashboard' })
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
      const { data } = await axios.post('admin/logout')
      localStorage.clear()
      router.push({ name: 'LoginAdmin' })
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message, { timeout: 2000 })
    }
  }

  return { user, login, logout }
})
