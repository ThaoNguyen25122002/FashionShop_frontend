<template>
  <div class="p-4">
    <form @submit.prevent="createProduct(product)" class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Thêm Sản Phẩm Mới</h2>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div>
              <label class="block text-gray-700 font-semibold">Tên Sản Phẩm</label>
              <input
                type="text"
                v-model="product.name"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div class="mt-4">
              <label class="block text-gray-700 font-semibold">Giá</label>
              <input
                type="text"
                v-model="product.price"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-gray-700 font-semibold">Loại Sản Phẩm</label>
            <select
              v-model="product.category_ids"
              multiple
              class="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 h-32 overflow-auto"
              name="mySelect"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                class="py-2 hover:bg-red-100 hover:text-red-800"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold">Ảnh</label>
          <input
            type="file"
            multiple
            @change="onFileChange"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div v-if="imagesPreview.length > 0" class="flex items-center gap-5 mt-5">
            <img
              v-for="(image, index) in imagesPreview"
              :key="index"
              :src="image"
              alt="Selected Image"
              class="w-36 h-28 object-cover rounded-md"
            />
          </div>
        </div>

        <div
          v-for="(item, index) in product.variations"
          :key="index"
          class="grid grid-cols-3 gap-4"
        >
          <div>
            <label class="block text-gray-700 font-semibold">Màu Sắc</label>
            <input
              type="text"
              v-model="item.color"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold">Kích Thước</label>
            <input
              type="text"
              v-model="item.size"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold">Số Lượng</label>
            <input
              type="number"
              v-model="item.quantity"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <button
            @click="addRow"
            type="button"
            class="mt-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Thêm +
          </button>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold">Mô Tả</label>
          <input
            type="text"
            v-model="product.description"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-start space-x-4">
        <button type="submit" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Tạo sản phẩm
        </button>
        <button
          type="button"
          @click="cancel"
          class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          Hủy
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useProduct from '@/composables/Admin/products'
import useCategory from '@/composables/handleCategory'
const { product, createProduct } = useProduct()
const { getCategories, categories } = useCategory()
const imagesPreview = ref([])
const onFileChange = (event) => {
  const files = event.target.files
  imagesPreview.value = []
  product.images = []
  // product.images = Array.from(files)
  // console.log(product.images)

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    product.images.push(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      imagesPreview.value.push(e.target.result) // Thêm URL của ảnh vào danh sách
    }
    reader.readAsDataURL(file) // Đọc file dưới dạng Data URL để hiển thị ảnh
  }
  // console.log(product.images)
}
function addRow() {
  product.variations.push({ color: '', size: '', quantity: 1 })
}

onMounted(() => {
  getCategories()
})
</script>
