import { defineStore } from 'pinia'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '@/plugins/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),

  getters: {
    // Retorna true se o usuário estiver logado
    isLoggedIn: (state) => !!state.user,

    // Dados úteis do usuário
    userName: (state) => state.user?.displayName || '',
    userEmail: (state) => state.user?.email || '',
    userPhoto: (state) => state.user?.photoURL || ''
  },

  actions: {
    // Login com popup do Google
    async login() {
      try {
        const result = await signInWithPopup(auth, provider)
        this.user = result.user
      } catch (err) {
        console.error('Erro no login:', err)
      }
    },

    // Logout e limpa estado
    async logout() {
      try {
        await signOut(auth)
        this.user = null
      } catch (err) {
        console.error('Erro ao deslogar:', err)
      }
    },

    // Inicializa a store com o usuário atual
    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
      })
    }
  }
})
