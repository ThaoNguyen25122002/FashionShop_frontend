<template>
  <h3 class="py-5 shadow-lg text-center">Admin Dashboard</h3>

  <!-- Top Statistics Section -->
  <div class="grid grid-cols-4 gap-4 mb-8 mt-5 p-4">
    <!-- Đơn Hàng -->
    <div class="bg-red-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <!-- Icon Placeholder -->
          <i class="fas fa-wallet fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Đơn Hàng</h2>
          <p class="text-2xl">9</p>
        </div>
      </div>
    </div>
    <!-- Tổng Doanh Thu -->
    <div class="bg-green-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <i class="fas fa-dollar-sign fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Tổng Doanh Thu</h2>
          <p class="text-2xl">10,906,800đ</p>
        </div>
      </div>
    </div>
    <!-- Sản Phẩm -->
    <div class="bg-blue-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <i class="fas fa-box fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Sản Phẩm</h2>
          <p class="text-2xl">1.149</p>
        </div>
      </div>
    </div>
    <!-- Báo Cáo -->
    <div class="bg-yellow-500 text-white p-4 rounded-lg shadow">
      <div class="flex items-center">
        <div class="mr-4">
          <i class="fas fa-calendar-alt fa-2x"></i>
        </div>
        <div>
          <h2 class="font-bold text-xl">Báo Cáo</h2>
          <p class="text-2xl">12</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Orders Table Section -->
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="font-semibold text-lg mb-4">Đơn Hàng Cần Xác Nhận</h3>
    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="py-2 px-4">Khách Hàng</th>
          <th class="py-2 px-4">Ngày Đặt Hàng</th>
          <th class="py-2 px-4">Giỏ Hàng</th>
          <th class="py-2 px-4">Trạng Thái</th>
          <th class="py-2 px-4">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b text-center">
          <td class="py-2 px-4">Trần Công Minh</td>
          <td class="py-2 px-4">21:00:02 10-04-2024</td>
          <td class="py-2 px-4">2 Sản Phẩm</td>
          <td class="py-2 px-4">
            <span class="bg-blue-500 text-white px-2 py-1 rounded-full">Chờ Xác Nhận</span>
          </td>
          <td class="py-2 px-4">
            <router-link :to="{ name: 'order.detail' }"
              ><a class="bg-red-500 text-white p-2 rounded-lg mr-2">
                <i class="fas fa-eye"></i> </a
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'order' }" href="#" class="text-blue-500 mt-4 block"
      >Xem tất cả đơn hàng →</router-link
    >
  </div>
</template>
