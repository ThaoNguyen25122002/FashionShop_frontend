import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref(JSON.parse(localStorage.getItem('cart')) || [])
  const countCartItems = computed(() => cartItems.value.length)
  const findProductIndex = (id) => {
    return cartItems.value.findIndex((product) => product.id === id)
  }

  const addToCart = (item) => {
    // console.log(findProductIndex(item.id))
    // const index = findProductIndex(item.id)
    const index = cartItems.value.findIndex(
      (cartItem) =>
        cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
    )
    // console.log('trong cartItems: ', cartItems.value[index].variant)
    // console.log('trong item: ', item.variant)
    if (index !== -1) {
      cartItems.value[index].quantity += item.quantity
    } else {
      cartItems.value.push(item)
    }
    localStorage.setItem('cart', JSON.stringify(cartItems.value))

    console.log(JSON.parse(localStorage.getItem('cart')))
    // console.log(cartItems.value)
  }
  const increaseQuantity = (index) => {
    cartItems.value[index].quantity += 1
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
  const decreaseQuantity = (index) => {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity -= 1
    }
    // console.log(cartItems.value)
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
  const removeItem = (index) => {
    cartItems.value.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => (total += item.price * item.quantity), 0)
  })
  return {
    addToCart,
    countCartItems,
    cartItems,
    formatCurrency,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    cartTotal
  }
})
