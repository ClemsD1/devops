<template>
    <div class="login-container">
        <h2>Connexion</h2>
        <form @submit.prevent="login" class="login-form">
            <input v-model="identifier" type="text" placeholder="Email ou Nom d'Utilisateur" />
            <input v-model="password" type="password" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
        <p>Pas encore de compte ? <router-link to="/register">Inscrivez-vous ici !</router-link></p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useCartStore } from '../stores/cartStore'

const identifier = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const login = () => {
    const stored = localStorage.getItem('users')
    const users = stored ? JSON.parse(stored) : []

    const foundUser = users.find(
        (u: any) =>
            (u.email === identifier.value || u.pseudo === identifier.value) &&
            u.password === password.value
    )

    if (foundUser) {
        userStore.login({ email: foundUser.email, pseudo: foundUser.pseudo })
        localStorage.setItem('user', JSON.stringify(foundUser))
        cartStore.loadCartFromStorage()
        router.push('/catalog')
    } else {
        error.value = 'Identifiants incorrects'
    }
}
</script>