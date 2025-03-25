<template>
    <div class="profile-container">
      <h2>Mon Profil</h2>
  
      <form class="login-form" @submit.prevent="save">
        <label>Nom d'Utilisateur :</label>
        <input v-model="pseudo" type="text" />
  
        <label>Email :</label>
        <input v-model="email" type="email" />
  
        <label>Nouveau mot de passe :</label>
        <input v-model="password" type="password" placeholder="Laisser vide pour ne pas changer" />
  
        <button type="submit">Enregistrer les modifications</button>
        <p class="success" v-if="success">{{ success }}</p>
      </form>
    </div>
  </template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const user = userStore.user

const pseudo = ref(user?.pseudo || '')
const email = ref(user?.email || '')
const password = ref('')
const success = ref('')

const save = () => {
    if (!user) return

    const stored = localStorage.getItem('users')
    if (stored) {
        const users = JSON.parse(stored)
        const index = users.findIndex((u: any) => u.email === user.email)
        if (index !== -1) {
            users[index].pseudo = pseudo.value
            users[index].email = email.value
            if (password.value) users[index].password = password.value

            localStorage.setItem('users', JSON.stringify(users))

            const updatedUser = {
                email: email.value,
                pseudo: pseudo.value
            }
            userStore.login(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))

            success.value = 'Modifications enregistrées avec succès ✅'
            password.value = ''
        }
    }
}
</script>