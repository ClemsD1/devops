<template>
  <div class="cart-container">
    <h2>Mon panier</h2>

    <div v-if="cartStore.items.length === 0">
      <p>Le panier est vide.</p>
    </div>

    <div v-else>
      <div class="cart-item" v-for="item in cartStore.items" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>Prix : {{ item.price }} €</p>
        <input type="number" v-model.number="item.quantity" min="1"
          @change="cartStore.updateQuantity(item.id, item.quantity)" />
        <button @click="cartStore.remove(item.id)">Supprimer</button>
      </div>

      <div class="cart-total">
        <h3>Total : {{ cartStore.total }} €</h3>
      </div>

      <div class="cart-actions" v-if="cartStore.items.length > 0">
        <button @click="validateOrder">Valider la commande</button>
      </div>
      
      <p class="success" v-if="confirmation">Votre commande a été validée avec succès ! Envoi de la commande en cours...</p>

    </div>
  </div>
</template>


<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { ref } from 'vue'
import { nextTick } from 'vue'

const confirmation = ref(false)

const validateOrder = () => {
  confirmation.value = true

  setTimeout(() => {
    cartStore.items = []
    cartStore.saveCartToStorage()
  }, 2500)
  
  setTimeout(() => {
    confirmation.value = false
  }, 3000)
}

const cartStore = useCartStore()
</script>