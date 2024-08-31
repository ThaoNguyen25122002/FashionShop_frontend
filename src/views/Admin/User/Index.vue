<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <h1 class="text-2xl font-bold text-gray-700 mb-4">Quản Lý Người Dùng</h1>
    <router-link
      to="user/create"
      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Thêm Người Dùng Mới +
    </router-link>
    <div class="mt-6 overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-4">STT</th>
            <th class="py-3 px-4">Tên Người Dùng</th>
            <th class="py-3 px-4">Email</th>
            <th class="py-3 px-4">Ngày Tạo</th>
            <th class="py-3 px-4">Khóa</th>
            <th class="py-3 px-4">Ủy Quyền</th>
            <th class="py-3 px-4">Thao Tác</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm">
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4">{{ user.name }}</td>
            <td class="py-3 px-4">{{ user.name }}</td>
            <td class="py-3 px-4">{{ user.created_at }}</td>
            <td class="py-3 px-4 text-center">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-red-600" />
            </td>
            <td class="py-3 px-4">Khách Hàng</td>
            <td class="py-3 px-4 flex space-x-2">
              <router-link
                :to="{ name: 'user.edit', params: { id: user.id } }"
                class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </router-link>
              <button
                @click="handleDelete(user.id)"
                class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
              >
                <i class="fa-solid fa-x"></i>
              </button>
            </td>
          </tr>

          <!-- Các dòng khác -->
        </tbody>
      </table>
    </div>
    <!-- Phân trang -->
    <div class="mt-4 flex justify-between items-center">
      <div>
        <span class="text-sm text-gray-700">
          Hiển thị
          <span class="font-medium">1</span>
          đến
          <span class="font-medium">10</span>
          của
          <span class="font-medium">50</span>
          kết quả
        </span>
      </div>
      <div>
        <nav class="inline-flex shadow-sm">
          <button
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-l-lg"
          >
            Trước
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            1
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            2
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            3
          </button>
          <button
            class="bg-white border-t border-b border-gray-300 text-gray-700 hover:bg-gray-200 px-3 py-1"
          >
            4
          </button>
          <button
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-r-lg"
          >
            Sau
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import useUserManagement from '@/composables/Admin/userManagement'
import { onMounted } from 'vue'
const { users, getUsers, deleteUser } = useUserManagement()
const handleDelete = (id) => {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa?',
    text: 'Hành động này không thể hoàn tác!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      // Thực hiện hành động xóa sản phẩm
      deleteUser(id)
      Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success')
    }
  })
}
onMounted(() => {
  getUsers()
})
</script>
