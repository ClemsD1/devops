import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  email: string
  pseudo: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const login = (userData: User) => {
    user.value = userData
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const isLoggedIn = () => !!user.value

  const loadFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return { user, login, logout, isLoggedIn, loadFromLocalStorage }
})
