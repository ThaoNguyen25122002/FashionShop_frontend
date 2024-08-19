<template>
  <header
    class="sticky top-[-52px] shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-40"
  >
    <!-- Upper Navbar -->
    <div class="bg-primary/40 py-2">
      <div class="container flex justify-between items-center">
        <div class="">
          <a class="font-bold text-2xl sm:3xl flex gap-2" href="#">
            <img class="w-10 uppercase" src="../../../assets/logo.png" alt="" />
            HahaShop
          </a>
        </div>
        <!-- Search Navbar  -->
        <div class="flex items-center justify-between gap-4">
          <div class="relative group hidden sm:block">
            <input
              class="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
              type="text"
              placeholder="Search..."
            />
            <i
              class="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 fa-solid fa-magnifying-glass"
            ></i>
          </div>
          <!-- Order Button -->
          <router-link
            to="/cart"
            class="relative bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white rounded-full px-4 py-1 flex items-center gap-3 group overflow-hidden"
          >
            <span
              class="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-[-20px] transition-all duration-200"
            >
              Order
            </span>
            <p
              class="absolute transform translate-x-1 group-hover:translate-x-[-20px] opacity-100 transition-all group-hover:opacity-0"
            >
              <i class="fa-duotone fa-solid fa-face-laugh-wink"></i>
              <span> 0</span>
            </p>
            <i
              class="text-xl text-white drop-shadow-sm cursor-pointer fa-solid fa-cart-shopping transition-all duration-200"
            ></i>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Lower Navbar -->
    <div class="flex justify-center">
      <ul class="sm:flex hidden items-center gap-4">
        <li class="">
          <router-link
            to="/"
            class="inline-block cursor-pointer px-4 hover:text-primary duration-200 py-[11px]"
            >Home</router-link
          >
        </li>
        <li class="">
          <a class="inline-block cursor-pointer px-4 hover:text-primary duration-200">Top Rated</a>
        </li>
        <li class="">
          <a class="inline-block cursor-pointer px-4 hover:text-primary duration-200">Kid Wear</a>
        </li>
        <li class="">
          <a class="inline-block cursor-pointer px-4 hover:text-primary duration-200">Mens Wear</a>
        </li>
        <li class="">
          <a class="inline-block cursor-pointer px-4 hover:text-primary duration-200"
            >Electronics</a
          >
        </li>
        <li class="">
          <a class="inline-block cursor-pointer px-4 hover:text-primary duration-200">WishList</a>
        </li>
        <li v-if="true">
          <router-link
            to="login"
            class="inline-block cursor-pointer px-4 hover:text-primary duration-200"
            href=""
            >Login</router-link
          >
        </li>
        <li v-else class="relative group">
          <a class="flex items-center gap-[3px] py-2 cursor-pointer">
            Hi! Thao
            <span class="">
              <i
                class="fa-solid fa-sort-down pb-[10px] group-hover:rotate-180 transition-all duration-200"
              ></i>
            </span>
          </a>
          <ul
            class="absolute z-30 hidden group-hover:block left-0 right-[-50px] top-[100%] bg-white text-black p-2 shadow-md rounded-md"
          >
            <li>
              <a class="inline-block cursor-pointer w-full rounded-md p-2 hover:bg-primary/20"
                >Profile</a
              >
            </li>
            <li>
              <a class="inline-block cursor-pointer w-full rounded-md p-2 hover:bg-primary/20">
                Order list</a
              >
            </li>
            <li>
              <a class="inline-block cursor-pointer w-full rounded-md p-2 hover:bg-primary/20"
                >Logout</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>
<script setup></script>
