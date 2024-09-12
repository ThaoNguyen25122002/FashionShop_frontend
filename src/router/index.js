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
import EditCategory from '@/views/Admin/Categories/EditCategory.vue'
import EditProduct from '@/views/Admin/Product/EditProduct.vue'
import ProductDetail from '@/views/Member/Products/ProductDetail.vue'
import ForgotPassword from '@/views/Member/Auth/ForgotPassword.vue'
import CategoryProducts from '@/views/Member/Products/CategoryProducts.vue'
import ResetPassword from '@/views/Member/Auth/ResetPassword.vue'
import MemberProfile from '@/views/Member/Profile/MemberProfile.vue'
import ProductsSearch from '@/views/Member/Products/ProductsSearch.vue'
import OrderView from '@/views/Member/Orders/OrderView.vue'
import CheckoutView from '@/views/Member/Orders/CheckoutView.vue'
import OrderDetailMember from '@/views/Member/Orders/OrderDetail.vue'
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
        path: 'product/:id/detail',
        name: 'ProductDetail',
        component: ProductDetail
      },
      {
        path: 'cart',
        name: 'CartView',
        component: CartView
      },
      {
        path: 'login',
        name: 'LoginMemberView',
        component: LoginMemberView,
        meta: { requiresGuest: true }
      },
      {
        path: 'register',
        name: 'RegisterMember',
        component: RegisterMember,
        meta: { requiresGuest: true }
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: { requiresGuest: true }
      },
      {
        path: '/category/:id',
        name: 'CategoryProducts',
        component: CategoryProducts
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPassword
        // props: (route) => ({
        //   token: route.query.token,
        //   email: route.query.email
        // })
      },
      {
        path: 'profile',
        name: 'MemberProfile',
        component: MemberProfile,
        meta: { requiresAuth: true }
      },
      {
        path: '/search',
        name: 'Search',
        component: ProductsSearch
      },
      {
        path: 'checkout',
        name: 'CheckoutView',
        component: CheckoutView,
        meta: { requiresAuth: true }
      },
      {
        path: 'Order',
        name: 'OrderView',
        component: OrderView,
        meta: { requiresAuth: true }
      },
      {
        path: 'order/:orderId/detail',
        name: 'OrderDetailMember',
        component: OrderDetailMember,
        meta: { requiresAuth: true }
      }
    ]
  },
  // Admin
  {
    path: '/admin/',
    name: 'AdminLayout',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'profile',
        name: 'Profile',
        component: MyProfile
      },
      {
        path: 'user',
        name: 'user',
        component: Index
      },
      {
        path: 'user/:id/edit',
        name: 'user.edit',
        component: Edit
      },
      {
        path: 'user/create',
        name: 'user.create',
        component: Create
      },
      {
        path: 'category',
        name: 'category',
        component: ListCategories
      },
      {
        path: 'category/:id/edit',
        name: 'category.edit',
        component: EditCategory
      },
      {
        path: 'category/create',
        name: 'category.create',
        component: CreateCategory
      },
      {
        path: 'product',
        name: 'product',
        component: ListProducts
      },
      {
        path: 'product/create',
        name: 'product.create',
        component: CreateProduct
      },
      {
        path: 'product/:id/edit',
        name: 'product.edit',
        component: EditProduct
      },
      {
        path: 'orders',
        name: 'orders',
        component: ListOrders
      },
      {
        path: 'order/:orderId/detail',
        name: 'order.detail',
        component: OrderDetail
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

// router.beforeEach((to, from, next) => {
//   // const token = !!localStorage.getItem('token')
//   // const role = JSON.parse(localStorage.getItem('user')).role
//   // if (to.meta.requiresAuth && !token) {
//   //   next({ name: 'LoginAdmin' })
//   // } else {
//   //   next()
//   // }
//   const loggedIn = !!localStorage.getItem('token')
//   const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
//   const role = user ? user.role : null
//   // console.log(role)

//   // Chặn truy cập vào trang login và register nếu đã đăng nhập
//   if (to.meta.requiresGuest && loggedIn) {
//     if (role === 'admin') {
//       return next({ name: 'Dashboard' }) // Chuyển đến dashboard nếu là admin
//     }
//     return next({ name: 'HomeView' }) // Chuyển về home nếu là member
//   }

//   // Kiểm tra nếu route yêu cầu xác thực
//   if (to.meta.requiresAuth) {
//     if (!loggedIn) {
//       // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
//       if (to.meta.role === 'admin') {
//         return next({ name: 'LoginAdmin' }) // Nếu cố vào admin dashboard mà chưa đăng nhập
//       } else {
//         return next({ name: 'LoginMemberView' }) // Nếu cố vào trang member mà chưa đăng nhập
//       }
//     } else if (role !== to.meta.role) {
//       // Nếu role không khớp với yêu cầu của route
//       if (role === 'admin') {
//         return next({ name: 'Dashboard' }) // Admin chuyển đến dashboard
//       } else {
//         return next({ name: 'HomeView' }) // Member chuyển đến home
//       }
//     }
//   }

//   // Nếu không có vấn đề gì, cho phép tiếp tục
//   next()
// })
router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('token')
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  const role = user ? user.role : null

  // Chặn truy cập vào trang login và register nếu đã đăng nhập
  if (to.meta.requiresGuest && loggedIn) {
    if (role === 'admin') {
      return next({ name: 'Dashboard' })
    }
    return next({ name: 'HomeView' })
  }

  // Kiểm tra nếu route yêu cầu xác thực
  if (to.meta.requiresAuth) {
    if (!loggedIn) {
      // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
      if (to.meta.role === 'admin') {
        return next({ name: 'LoginAdmin' })
      } else {
        return next({ name: 'LoginMemberView' })
      }
    } else if (to.meta.role && role !== to.meta.role) {
      // Nếu role không khớp với yêu cầu của route
      if (role === 'admin') {
        return next({ name: 'Dashboard' })
      } else {
        return next({ name: 'HomeView' })
      }
    }
  }

  // Nếu không có vấn đề gì, cho phép tiếp tục
  next()
})

export default router
