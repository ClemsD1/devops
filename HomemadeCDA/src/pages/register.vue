<template>
  <div class="login-container">
    <h2>Inscription</h2>
    <form @submit.prevent="register" class="login-form">
      <input v-model="pseudo" type="text" placeholder="Nom d'Utilisateur" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button type="submit">S'inscrire</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
    <p>Déjà inscrit ? <router-link to="/login">Connecte-toi ici !</router-link></p>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const pseudo = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()

const register = () => {
  const stored = localStorage.getItem('users')
  const users = stored ? JSON.parse(stored) : []

  const exists = users.find((u: any) => u.email === email.value)
  if (exists) {
    error.value = 'Cet email est déjà utilisé.'
    success.value = ''
    return
  }

  users.push({ pseudo: pseudo.value, email: email.value, password: password.value })
  localStorage.setItem('users', JSON.stringify(users))

  error.value = ''
  success.value = 'Inscription réussie ! Redirection...'
  setTimeout(() => router.push('/login'), 1500)
}
</script>
