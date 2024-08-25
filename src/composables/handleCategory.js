import axios from '@/axios/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
export default function useCategory() {
  const toast = useToast()
  const router = useRouter()
  const isLoading = ref(false)
  const categories = ref([])
  const category = ref({})
  const getCategories = async () => {
    isLoading.value = true
    try {
      const { data } = await axios.get('admin/categories')
      categories.value = data.data
      // console.log(categories.value)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  const getCategory = async (id) => {
    isLoading.value = true
    try {
      const { data } = await axios.get(`admin/category/${id}`)
      category.value = data.data
      // console.log(category.value)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  const updateCategory = async (categoryData) => {
    if (categoryData.name === '') {
      toast.error('Nhập danh mục!', { timeout: 2000 })
      return
    }

    try {
      await axios.put(`admin/category/${categoryData.id}/update`, categoryData)
      category.value = {}
      toast.success('Đã cập nhật!', { timeout: 2000 })
      router.push({ name: 'category' })
    } catch (error) {
      console.log(error)
      toast.error('Cập nhật thất bại!', { timeout: 2000 })
    }
  }
  const deleteCategory = async (id) => {
    // console.log(id)
    try {
      await axios.delete(`admin/category/${id}/delete`)
      toast.success('Đã xoá!', { timeout: 2000 })
      await getCategories()
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error)
    }
  }

  return {
    deleteCategory,
    getCategory,
    getCategories,
    updateCategory,
    category,
    categories,
    isLoading
  }
}
