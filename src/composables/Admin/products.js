import axios from '@/axios/axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
export default function useProduct() {
  const toast = useToast()
  const errors = ref('')
  const isLoading = ref(false)
  const router = useRouter()
  const products = ref([])
  const productShow = ref({
    name: '',
    description: '',
    category_ids: [],
    images: [],
    price: null,
    variations: [
      {
        color: '',
        size: '',
        quantity: 1
      }
    ]
  })
  const product = reactive({
    name: '',
    description: '',
    category_ids: [],
    images: [],
    price: null,
    variations: [
      {
        color: '',
        size: '',
        quantity: 1
      }
    ]
  })
  const checkError = (data) => {
    // console.log('checked')

    data.price = data.price ? data.price.toString().replace(/\s+/g, '') : null // Loại bỏ khoảng trắng
    if (!data.name) {
      errors.value = 'Vui lòng nhập tên sản phẩm!'
      return false
    }
    if (data.new_images) {
      if (!data.new_images.length || data.new_images.length > 3) {
        errors.value = 'Vui lòng chọn ít nhất 1 và nhỏ hơn 3 hình ảnh!'
        return false
      }
    }
    if (!data.category_ids.length) {
      errors.value = 'Vui lòng nhập danh mục sản phẩm!'
      return false
    }
    if (data.price === null || isNaN(Number(data.price))) {
      errors.value = 'Vui lòng nhập giá sản phẩm hợp lệ!'
      return false
    }
    if (!data.images.length || data.images.length > 3) {
      errors.value = 'Vui lòng chọn ít nhất một và nhỏ hơn 3 hình ảnh!'
      return false
    }

    for (const variation of data.variations) {
      if (!variation.color || !variation.size || !variation.quantity) {
        errors.value = 'Vui lòng nhập đầy đủ size, color, và quantity!'
        return false
      }
    }
    errors.value = ''
    return true
  }
  const createProduct = async (data) => {
    if (!checkError(data)) {
      toast.error(errors.value)
      return
    }

    try {
      await axios.post('admin/product/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Đã thêm sản phẩm!!!')
      router.push({ name: 'product' })
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình tạo sản phẩm.'
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

  const getProducts = async () => {
    isLoading.value = true
    try {
      const { data } = await axios.get('admin/products')
      products.value = data.data
      console.log(products.value)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  const getProduct = async (id) => {
    isLoading.value = true
    try {
      const { data } = await axios.get(`admin/product/${id}`)
      productShow.value = data.data
      console.log(productShow.value)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  const checked = (data) => {
    if (data.name === '') {
      console.log('name khong duoc trong')
      return false
    }
  }
  const updateProduct = async (data, id) => {
    if (!checkError(data)) {
      toast.error(errors.value)
      return
    }
    try {
      await axios.post(`admin/product/${id}/update`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Đã cập nhật sản phẩm!!!')
      router.push({ name: 'product' })
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình tạo sản phẩm.'
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
    product,
    products,
    productShow,
    updateProduct,
    getProducts,
    getProduct,
    createProduct
  }
}
