import axios from '@/axios/axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
export default function useProduct() {
  const toast = useToast()
  const errors = ref('')
  const router = useRouter()
  const product = reactive({
    name: '',
    description: '',
    category_id: 1,
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
    if (!data.name) {
      errors.value = 'Vui lòng nhập tên sản phẩm!'
      return false
    }
    if (data.price === null) {
      errors.value = 'Vui lòng nhập giá sản phẩm!'
      return false
    }
    if (!data.images.length) {
      errors.value = 'Vui lòng chọn ít nhất một hình ảnh!'
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
    console.log(data)
  }
  return { product, createProduct }
}
