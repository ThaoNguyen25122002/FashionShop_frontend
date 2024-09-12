import axios from '@/axios/axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
export default function useOrder() {
  const toast = useToast()
  const errors = ref('')
  const isLoading = ref(false)
  const router = useRouter()
  const order = ref({})
  const orders = ref([])
  const pendingOrders = ref([])
  const pagination = {}
  const getPendingOrders = async () => {
    try {
      const { data } = await axios.get('admin/orders/pending')
      pendingOrders.value = data.data
      console.log(pendingOrders.value)
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình lấy đơn hàng.'
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

  const orderConfirm = async (orderId) => {
    try {
      axios.put(`admin/order/${orderId}/confirm`)
      getPendingOrders()
      toast.success('Xác nhận thành công!')
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình xác nhận.'
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
  const getOrderDetail = async (orderId) => {
    try {
      const { data } = await axios.get(`admin/order/${orderId}/details`)
      order.value = data.data
      console.log(order.value)
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình lấy đơn hàng.'
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
  const updateOrderStatus = async () => {
    try {
      await axios.put(`admin/order/${order.value.id}/status`, {
        status: order.value.status
      })
      //   order.value = data.data
      //   console.log(order.value)
      toast.success('Cập nhật thành công!', { timeout: 1500 })
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình thay đổi trạng thái.'
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
  const getOrders = async (page = 1) => {
    try {
      const { data } = await axios.get(`admin/orders?page=${page}`)
      orders.value = data.data
      pagination.value = data.meta
      console.log(pagination.value)
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình tải danh sách đơn hàng.'
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
  const searchOrders = async (q) => {
    try {
      const { data } = await axios.get(`admin/orders/search`, {
        params: {
          query: q
        }
      })
      orders.value = data.data
      pagination.value = data.meta
      // console.log(data.data)
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Có lỗi xảy ra trong quá trình tải danh sách đơn hàng.'
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
    pendingOrders,
    order,
    orders,
    pagination,
    getPendingOrders,
    orderConfirm,
    getOrderDetail,
    updateOrderStatus,
    getOrders,
    searchOrders
  }
}
