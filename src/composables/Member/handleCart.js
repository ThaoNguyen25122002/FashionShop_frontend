import axios from '@/axios/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
export default function useCart() {
  const toast = useToast()
  const router = useRouter()
  const isLoading = ref(false)
  const carts = ref([])
  const cartItem = ref({})

  return {}
}
