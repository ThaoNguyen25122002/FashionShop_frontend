<template>
  <div class="p-4">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Thêm người dùng mới</h2>
      <div class="flex space-x-6">
        <!-- Avatar Section -->
        <div class="w-1/3 flex flex-col items-center">
          <div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <svg class="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2 20c0-4.42 3.58-8 8-8s8 3.58 8 8H2z"
              ></path>
            </svg>
          </div>
          <button
            class="mt-4 bg-white border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
          >
            Chọn Ảnh
          </button>
        </div>

        <!-- Form Section -->
        <div class="w-2/3 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Họ Và Tên</label>
              <input
                type="text"
                value="Trần Công Minh"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Email</label>
              <input
                type="email"
                value="minhtcps30359@fpt.edu.vn"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700">Số Điện Thoại</label>
              <input
                type="text"
                value="0123456789"
                class="mt-1 block w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-700">Chọn Tỉnh / Thành Phố</label>
              <input
                type="text"
                value="Thành phố Hà Nội"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Quận/Huyện</label>
              <input
                type="text"
                value="Quận Hà Đông"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label class="block text-gray-700">Phường/Xã</label>
              <input
                type="text"
                value="Phường Phúc La"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700">Nhập địa chỉ cụ thể</label>
            <input
              type="text"
              value="128 Phùng Hưng"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label class="block text-gray-700">Ủy Quyền</label>
            <select
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option>Tài Khoản Khách Hàng</option>
              <!-- Các tùy chọn khác -->
            </select>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end space-x-4">
        <button class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
          Thêm người dùng
        </button>
        <button class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">Hủy</button>
      </div>
    </div>
  </div>
</template>
