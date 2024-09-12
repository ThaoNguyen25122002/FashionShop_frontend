import axios from '@/axios/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
export default function useUserManagement() {
  const toast = useToast()
  const router = useRouter()
  const isLoading = ref(false)
  const errors = ref({})
  const categories = ref([])
  const users = ref([])
  const user = ref({
    role: 'member'
  })
  //   const getCategories = async () => {
  //     isLoading.value = true
  //     try {
  //       const { data } = await axios.get('admin/categories')
  //       categories.value = data.data
  //       // console.log(categories.value)
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       isLoading.value = false
  //     }
  //   }
  //   const getCategory = async (id) => {
  //     isLoading.value = true
  //     try {
  //       const { data } = await axios.get(`admin/category/${id}`)
  //       category.value = data.data
  //       // console.log(category.value)
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       isLoading.value = false
  //     }
  //   }
  //   const updateCategory = async (categoryData) => {
  //     if (categoryData.name === '') {
  //       toast.error('Nhập danh mục!', { timeout: 2000 })
  //       return
  //     }

  //     try {
  //       await axios.put(`admin/category/${categoryData.id}/update`, categoryData)
  //       category.value = {}
  //       toast.success('Đã cập nhật!', { timeout: 2000 })
  //       router.push({ name: 'category' })
  //     } catch (error) {
  //       console.log(error)
  //       toast.error('Cập nhật thất bại!', { timeout: 2000 })
  //     }
  //   }
  //   const deleteCategory = async (id) => {
  //     // console.log(id)
  //     try {
  //       await axios.delete(`admin/category/${id}/delete`)
  //       toast.success('Đã xoá!', { timeout: 2000 })
  //       await getCategories()
  //     } catch (error) {
  //       console.error(`Error deleting user ${id}:`, error)
  //     }
  //   }
  const checkErrors = (data) => {
    console.log(data)

    // data.price = data.price ? data.price.toString().replace(/\s+/g, '') : null // Loại bỏ khoảng trắng
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
    if (data.avatar) {
      if (data.avatar && !data.avatar.type.startsWith('image/')) {
        errors.value = 'Tệp không phải là hình ảnh!'
        return false
      }
    }

    errors.value = ''
    return true
  }
  const getUsers = async () => {
    isLoading.value = true
    try {
      const { data } = await axios.get('admin/users')
      users.value = data.data
      //   if (!users.value.length) {
      //     toast.warning('Hiện chưa có user nào!')
      //   }
      console.log(users.value)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  const getUser = async (id) => {
    isLoading.value = true
    try {
      const { data } = await axios.get(`admin/user/${id}/edit`)
      user.value = data.data
      console.log(user.value)
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình tạo user.'
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
    } finally {
      isLoading.value = false
    }
  }
  const createUser = async (data) => {
    if (!checkErrors(data)) {
      toast.error(errors.value)
      return
    }
    try {
      await axios.post('admin/user/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Đã tạo tài khoản!!!')
      //   router.push({ name: 'product' })
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình tạo user.'
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
  const checkUpdate = (data) => {
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

    errors.value = ''
    return true
  }
  const updateUser = async (data) => {
    if (!checkUpdate(data)) {
      toast.error(errors.value)
      return
    }
    console.log(data)

    try {
      await axios.post(`admin/user/${data.id}/update`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Đã cập nhât tài khoản!!!')
      router.push({ name: 'user' })
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình tạo user.'
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
  const deleteUser = async (id) => {
    try {
      await axios.delete(`admin/user/${id}/delete`)
      // toast.success('Đã xoá tài khoản!!!')
      getUsers()
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình xóa user.'
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
  return {
    isLoading,
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    users,
    user
  }
}
