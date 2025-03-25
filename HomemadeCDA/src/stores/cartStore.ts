import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  const userStore = useUserStore()

  const saveCartToStorage = () => {
    const user = userStore.user
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(items.value))
    }
  }

  const loadCartFromStorage = () => {
    const user = userStore.user
    if (user) {
      const stored = localStorage.getItem(`cart_${user.email}`)
      items.value = stored ? JSON.parse(stored) : []
    }
  }

  const add = (product: Omit<Product, 'quantity'>) => {
    const existing = items.value.find(p => p.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveCartToStorage()
  }

  const remove = (id: number) => {
    items.value = items.value.filter(p => p.id !== id)
    saveCartToStorage()
  }

  const updateQuantity = (id: number, quantity: number) => {
    const product = items.value.find(p => p.id === id)
    if (product && quantity > 0) {
      product.quantity = quantity
      saveCartToStorage()
    }
  }

  const total = computed(() =>
    items.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
  )

  return { items, add, remove, updateQuantity, total, loadCartFromStorage }
})
