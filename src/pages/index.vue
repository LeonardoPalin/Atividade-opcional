<template>
  <div class="p-8 text-white">
    <h1 class="text-2xl font-bold mb-2">🏠 Página Inicial</h1>
    <p>Bem-vindo ao Intelli System, {{ userName || 'usuário' }}.</p>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { userName } = useUserStore()
</script>

<route lang="yaml">
meta:
  layout: default
  requiresAuth: true
</route>

<style scoped>
div {
  font-family: 'Segoe UI', sans-serif;
}
</style>
