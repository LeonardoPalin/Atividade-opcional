<template>
  <v-app>
    <v-app-bar app flat class="app-bar-gradient">
      <v-toolbar-title class="font-weight-bold text-white">
        🚀 Intelli System
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app permanent dark class="drawer-glass">
      <v-list dense nav>
        <v-list-item to="/">
          <v-list-item-title>Início</v-list-item-title>
        </v-list-item>
        <v-list-item to="/dashboard">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item to="/clientes">
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item to="/report">
          <v-list-item-title>Relatórios</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main-bg">
      <slot /> <!-- ESSENCIAL PRA RENDERIZAR O CONTEÚDO DAS PÁGINAS -->
    </v-main>
  </v-app>
</template>
