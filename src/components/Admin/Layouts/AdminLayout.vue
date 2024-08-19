<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <menu-view />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import MenuView from './MenuView.vue'
</script>
