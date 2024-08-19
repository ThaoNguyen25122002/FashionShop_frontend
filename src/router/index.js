import DefaultLayout from '@/components/Member/Layouts/DefaultLayout.vue'
import CartView from '@/views/Member/CartView.vue'
import HomeView from '@/views/Member/HomeView.vue'
import LoginMemberView from '@/views/Member/Auth/LoginMemberView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterMember from '@/views/Member/Auth/RegisterMember.vue'
import AdminLayout from '@/components/Admin/Layouts/AdminLayout.vue'
import LoginAdmin from '@/views/Admin/LoginAdmin.vue'
import Dashboard from '@/views/Admin/Dashboard.vue'
import MyProfile from '@/views/Admin/MyProfile.vue'
import Index from '@/views/Admin/User/Index.vue'
import Edit from '@/views/Admin/User/Edit.vue'
import Create from '@/views/Admin/User/Create.vue'
import ListCategories from '@/views/Admin/Categories/ListCategories.vue'
import CreateCategory from '@/views/Admin/Categories/CreateCategory.vue'
import ListProducts from '@/views/Admin/Product/ListProducts.vue'
import CreateProduct from '@/views/Admin/Product/CreateProduct.vue'
import ListOrders from '@/views/Admin/Order/ListOrders.vue'
import OrderDetail from '@/views/Admin/Order/OrderDetail.vue'
const routes = [
  // Member
  {
    path: '/',
    name: 'DefaultLayout',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'HomeView',
        component: HomeView
      },
      {
        path: 'cart',
        name: 'CartView',
        component: CartView,
        meta: { requiresAuth: true, role: 'member' }
      },
      {
        path: 'login',
        name: 'LoginMemberView',
        component: LoginMemberView
      },
      {
        path: 'register',
        name: 'RegisterMember',
        component: RegisterMember
      }
    ]
  },
  // Admin
  {
    path: '/admin/',
    name: 'AdminLayout',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: MyProfile
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'user',
        name: 'user',
        component: Index
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'user/edit',
        name: 'user.edit',
        component: Edit
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'user/create',
        name: 'user.create',
        component: Create
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'category',
        name: 'category',
        component: ListCategories
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'category/create',
        name: 'category.create',
        component: CreateCategory
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'product',
        name: 'product',
        component: ListProducts
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'product/create',
        name: 'product.create',
        component: CreateProduct
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'order',
        name: 'order',
        component: ListOrders
        // meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'order/detail',
        name: 'order.detail',
        component: OrderDetail
        // meta: { requiresAuth: true, role: 'admin' }
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: LoginAdmin
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'LoginAdmin' })
  } else {
    next()
  }
})

export default router
