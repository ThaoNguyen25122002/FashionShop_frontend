<template>
  <div class="p-8 bg-gray-50 rounded-xl shadow-lg">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Quản Lý Đơn Hàng</h1>

    <!-- Order Information Section -->
    <div class="border border-gray-200 rounded-lg p-6 bg-white mb-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6">Thông Tin Đơn Hàng</h2>

      <div class="grid grid-cols-2 gap-8">
        <!-- Customer Information -->
        <div>
          <h3 class="text-lg font-medium text-gray-600 mb-4">Thông Tin Khách Hàng</h3>
          <p class="text-gray-700 font-medium">Trần Công Minh</p>
          <p class="text-gray-500">
            128 Phùng Hưng, Phường Phúc La, Quận Hà Đông, Thành phố Hà Nội
          </p>
          <p class="text-gray-500">minhtcps30359@fpt.edu.vn</p>
          <p class="text-gray-500">0943263274</p>
        </div>

        <!-- Order Status, Payment and Shipping -->
        <div class="text-right">
          <div class="mb-4">
            <span class="text-gray-600 text-sm">Mã đơn hàng: </span>
            <span class="font-semibold text-gray-800">66169b628e65af14ebcf87c2</span>
          </div>
          <button
            class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition ease-in-out duration-150"
          >
            Đã Giao Hàng
          </button>
          <div class="mt-6">
            <p class="text-gray-500">
              Phương Thức Thanh Toán:
              <span class="font-semibold text-gray-700">Thanh Toán Khi Nhận Hàng</span>
            </p>
            <p class="text-gray-500">
              Phương Thức Vận Chuyển:
              <span class="font-semibold text-gray-700">Giao Hàng Tiết Kiệm</span>
            </p>
            <p class="text-gray-500">
              Ngày Đặt Hàng: <span class="font-semibold text-gray-700">21:00:02 10-04-2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Status Change Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Thay Đổi Trạng Thái Đơn Hàng</h3>
      <select
        class="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
      >
        <option value="delivered">Đã Giao Hàng</option>
        <option value="pending">Chờ Xác Nhận</option>
        <option value="processing">Đang Xử Lý</option>
      </select>
    </div>

    <!-- Product Information Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-700 mb-6">Thông Tin Sản Phẩm</h3>

      <!-- Product Table -->
      <table class="w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600">Ảnh</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600">Tên Sản Phẩm</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Giá</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Số Lượng</th>
            <th class="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          <!-- First Product -->
          <tr class="border-b">
            <td class="py-3 px-4">
              <img
                class="w-16 h-16 object-cover rounded-md"
                src="@/assets/women/women2.jpg"
                alt="Product 1"
              />
            </td>
            <td class="py-3 px-4">
              <div class="text-gray-800 font-medium">Áo sơ mi cơ bản dài tay</div>
              <div class="text-sm text-gray-500">Kích Thước: S | Màu Sắc: Đen</div>
            </td>
            <td class="py-3 px-4 text-right text-gray-700">149,000đ</td>
            <td class="py-3 px-4 text-right text-gray-700">2</td>
            <td class="py-3 px-4 text-right text-gray-700">298,000đ</td>
          </tr>
          <!-- Second Product -->
          <tr class="border-b">
            <td class="py-3 px-4">
              <img
                class="w-16 h-16 object-cover rounded-md"
                src="@/assets/women/women3.jpg"
                alt="Product 2"
              />
            </td>
            <td class="py-3 px-4">
              <div class="text-gray-800 font-medium">Áo Polo xơ cứng phối kẻ C9POL504M</div>
              <div class="text-sm text-gray-500">Kích Thước: M | Màu Sắc: Đen</div>
            </td>
            <td class="py-3 px-4 text-right text-gray-700">211,650đ</td>
            <td class="py-3 px-4 text-right text-gray-700">6</td>
            <td class="py-3 px-4 text-right text-gray-700">1,269,900đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Add any script logic if needed
</script>

<style scoped>
/* Custom styling can go here if required */
</style>
