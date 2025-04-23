<template>
  <v-app>
    <v-main class="main-bg d-flex align-center justify-center">
      <v-card class="pa-6 glass-card" width="400" elevation="12">
        <h2 class="text-center mb-4">Entrar com o Google</h2>

        <v-btn color="primary" block class="google-btn" @click="login">
          <v-icon left>mdi-google</v-icon>
          Entrar com o Google
        </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const auth = getAuth()
const provider = new GoogleAuthProvider()
const userStore = useUserStore()
const router = useRouter()

// se já estiver logado, redireciona
if (userStore.isLoggedIn) {
  router.replace('/')
}

const login = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    userStore.setUser(user)
    router.replace('/') // vai para página inicial após login
  } catch (err) {
    console.error('Erro ao logar:', err)
  }
}
</script>

<route lang="yaml">
meta:
  layout: empty
  requiresAuth: false
</route>

<style scoped>
.main-bg {
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  min-height: 100vh;
}
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  color: white;
}
.google-btn {
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}
.google-btn:hover {
  box-shadow: 0 0 15px #4285f4;
}
</style>
