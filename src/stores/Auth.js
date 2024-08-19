import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios/axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const router = useRouter()
  const toast = useToast()

  const saveUserData = (data) => {
    user.value = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const login = async (form) => {
    isLoading.value = true
    try {
      const { data } = await axios.post('admin/login', form)
      saveUserData(data)
      router.push({ name: 'Dashboard' })
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message, { timeout: 2000 })
      console.log('Login error:', message)
    } finally {
      isLoading.value = false
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

  return { user, isLoading, login, logout }
})
