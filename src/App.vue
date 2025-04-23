<template>
  <v-app>
    <!-- BARRA SUPERIOR -->
    <v-app-bar app flat class="app-bar-gradient">
      <v-toolbar-title class="font-weight-bold text-white">
        🚀 Intelli System
      </v-toolbar-title>
    </v-app-bar>

    <!-- MENU LATERAL COM ROTAS -->
    <v-navigation-drawer app permanent dark class="drawer-glass" v-if="user">
      <v-list dense nav>
        <v-list-item to="/" router>
          <v-list-item-title>Lar</v-list-item-title>
        </v-list-item>
        <v-list-item to="/painel" router>
          <v-list-item-title>Painel</v-list-item-title>
        </v-list-item>
        <v-list-item to="/clientes" router>
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- CONTEÚDO -->
    <v-main class="main-bg">
      <div class="d-flex align-center justify-center fill-height">
        <v-card
          class="glass-card pa-6 animate__animated animate__fadeInDown"
          width="400"
          elevation="12"
        >
          <template v-if="user">
            <v-card-title class="justify-center text-h6 mb-4">
              Entrar com o Google
            </v-card-title>

            <v-avatar size="100" class="avatar-glow mx-auto mb-4">
              <img :src="getUserAvatar()" alt="Avatar" @error="useDefaultAvatar" />
            </v-avatar>

            <div class="text-center mb-2">{{ user.displayName }}</div>
            <div class="text-center mb-4 grey--text">{{ user.email }}</div>

            <v-btn color="primary" block @click="logout">SAIR</v-btn>
          </template>

          <template v-else>
            <h2 class="text-center white--text mb-2">
              Bem-vindo ao Intelli System
            </h2>
            <p class="text-center grey--text text--lighten-1 mb-6">
              Faça login com sua conta Google para continuar
            </p>
            <v-btn
              color="primary"
              block
              @click="loginWithGoogle"
              class="google-btn"
            >
              <v-icon left>mdi-google</v-icon>
              Entrar com o Google
            </v-btn>
          </template>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export default {
  data() {
    return {
      user: null,
      avatarFallback: "",
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.user = null;
        })
        .catch((error) => {
          console.error("Erro ao sair:", error);
        });
    },
    loginWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          this.user = result.user;
        })
        .catch((error) => {
          console.error("Erro no login:", error);
        });
    },
    getUserAvatar() {
      if (this.avatarFallback) return this.avatarFallback;

      if (this.user?.photoURL) return this.user.photoURL;

      const name = this.user?.displayName || "Usuário";
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;
    },
    useDefaultAvatar() {
      this.avatarFallback =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    },
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

/* GRADIENTE TOPO */
.app-bar-gradient {
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
}

/* FUNDO PRINCIPAL */
.main-bg {
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  min-height: 100vh;
  position: relative;
}

/* MENU LATERAL */
.drawer-glass {
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2 !important;
}

.v-navigation-drawer {
  z-index: 2 !important;
}

/* CARTÃO VIDRO */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  color: white;
}

/* AVATAR */
.avatar-glow {
  box-shadow: 0 0 15px 2px #00e5ff;
  border: 2px solid #00e5ff;
  border-radius: 50%;
  overflow: hidden;
}

/* BOTÃO COM GLOW */
.google-btn {
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}
.google-btn:hover {
  box-shadow: 0 0 15px #4285f4;
}

/* FONTE */
* {
  font-family: "Segoe UI", Roboto, sans-serif;
}

/* TEXTO MENU */
.v-list-item-title {
  color: white !important;
}
</style>
