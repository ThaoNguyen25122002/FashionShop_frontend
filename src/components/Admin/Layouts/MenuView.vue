<template>
  <div class="w-64 shrink-0 border-r border-gray-200 bg-gray-50 py-4">
    <div class="px-4">
      <RouterLink to="/" class="inline-block">
        <img class="h-8 w-auto" :src="Logo" alt="" />
      </RouterLink>
    </div>

    <nav class="mt-4 px-2">
      <MenuItem v-for="item in navItems" :item="item" :key="item.label" />

      <button
        @click="authStore.logout"
        class="flex gap-2 items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
        Logout
      </button>
    </nav>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import MenuItem from './MenuItem.vue'
import Logo from '../../../assets/logo.png' // Your logo component
import { useAuthStore } from '@/stores/Auth'
const authStore = useAuthStore()
const navItems = [
  { name: 'Dashboard', active: false, label: 'Dashboard', children: [], icon: 'fa-solid fa-home' },
  { name: 'Profile', active: false, label: 'My Profile', children: [], icon: 'fa-solid fa-user' },
  {
    name: '#',
    active: false,
    label: 'Users',
    children: [
      { name: 'user', active: false, label: 'User List', children: [], icon: null },
      { name: 'user.create', active: false, label: 'Create User', children: [], icon: null }
    ],
    icon: 'fa-solid fa-users'
  },
  {
    name: '#',
    active: false,
    label: 'Categores',
    children: [
      { name: 'category', active: false, label: 'Category List', children: [], icon: null },
      { name: 'category.create', active: false, label: 'Create Category', children: [], icon: null }
    ],
    icon: 'fa-solid fa-layer-group'
  },
  {
    name: '#',
    active: false,
    label: 'Products',
    children: [
      { name: 'product', active: false, label: 'Product List', children: [], icon: null },
      { name: 'product.create', active: false, label: 'Create Product', children: [], icon: null }
    ],
    icon: 'fa-solid fa-cubes'
  },
  {
    name: '#',
    active: false,
    label: 'Orders',
    children: [{ name: 'orders', active: false, label: 'Order List', children: [], icon: null }],
    icon: 'fa-solid fa-car-side'
  }
]
</script>

<style scoped></style>
