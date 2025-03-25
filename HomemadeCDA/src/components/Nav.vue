<template>
  <nav>
    <button @click="go('/catalog')">Catalogue</button>
    <button @click="go('/cart')">Panier</button>
    <button @click="go('/profile')">Profil</button>
    <button @click="logout">Déconnexion</button>
    <button @click="toggleDarkMode">🌓</button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const go = (path: string) => {
  router.push(path)
}

const logout = () => {
  userStore.logout()
  router.push('/login')
}

const toggleDarkMode = () => {
  document.body.classList.toggle('dark')
}

</script>
