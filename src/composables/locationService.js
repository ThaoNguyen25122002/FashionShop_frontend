import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Set the base URL for axios
const locationURL = 'https://provinces.open-api.vn/api'

export default function useLocation() {
  const cities = ref([])
  const districts = ref([])
  const wards = ref([])
  const getCities = async () => {
    try {
      const response = await axios.get(`${locationURL}/p/`)
      cities.value = response.data
      console.log(cities.value)
    } catch (error) {
      console.error('Error fetching provinces:', error)
      throw error
    }
  }

  return { getCities, cities }
}
